import type { Loader } from 'astro/loaders';
import matter from 'gray-matter';
import { createHash } from 'crypto';
import { R2Client } from './Client';

export interface R2LoaderOptions {
  bucket: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicUrl?: string;
}

/**
 * ObsidianのローカルMarkdown画像記法をR2公開URLに変換
 * - ![[image.png]] → ![](https://asunaroblog.net/image.png)
 * - ![](./path/to/image.png) → ![](https://asunaroblog.net/path/to/image.png)
 * - ![](image.png) → ![](https://asunaroblog.net/image.png)
 */
export function transformImageUrls(markdown: string, publicUrl: string): string {
  if (!publicUrl) {
    return markdown;
  }

  // R2公開URLの末尾スラッシュを除去
  const baseUrl = publicUrl.replace(/\/$/, '');

  // パターン1: Obsidian Wikiリンク形式 ![[image.png]] → ![](https://assets.asunaroblog.net/image.png)
  let transformed = markdown.replace(
    /!\[\[([^\]]+\.(png|jpg|jpeg|gif|webp|svg))\]\]/gi,
    (match, filename) => {
      // ファイル名から相対パス記号を除去
      const cleanFilename = filename.replace(/^\.\//, '');
      return `![](${baseUrl}/${cleanFilename})`;
    }
  );

  // パターン2: Markdown形式の相対パス ![alt](./path/to/image.png) → ![alt](https://assets.asunaroblog.net/path/to/image.png)
  transformed = transformed.replace(
    /!\[([^\]]*)\]\(\.\/([^)]+\.(png|jpg|jpeg|gif|webp|svg))\)/gi,
    (match, alt, path) => {
      return `![${alt}](${baseUrl}/${path})`;
    }
  );

  // パターン3: Markdown形式の相対パス（./ なし） ![alt](image.png) → ![alt](https://asunaroblog.net/image.png)
  // ただし、既にhttps://で始まっている場合はスキップ
  transformed = transformed.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+\.(png|jpg|jpeg|gif|webp|svg))\)/gi,
    (match, alt, path) => {
      return `![${alt}](${baseUrl}/${path})`;
    }
  );

  return transformed;
}

/**
 * coverImageのパスをR2公開URLに変換
 * - cover.webp → https://assets.asunaroblog.net/assets/cover.webp
 * - ../assets/cover.png → https://assets.asunaroblog.net/assets/cover.png
 */
export function transformCoverImageUrl(coverImage: string, publicUrl: string): string {
  if (!publicUrl) {
    return coverImage;
  }

  const baseUrl = publicUrl.replace(/\/$/, '');

  // 相対パス記号を除去してファイル名を抽出
  // ../assets/cover.png → assets/cover.png
  // ./assets/cover.png → assets/cover.png
  // cover.png → cover.png
  const cleanPath = coverImage.replace(/^\.\.\//, '').replace(/^\.\//, '');

  // assets/ で始まる場合はそのまま、そうでない場合は assets/ を追加
  const finalPath = cleanPath.startsWith('assets/')
    ? cleanPath
    : `assets/${cleanPath}`;

  return `${baseUrl}/${finalPath}`;
}

/**
 * Cloudflare R2用のAstro Custom Loader
 * R2バケットからMarkdownファイルを取得してContent Collectionに追加
 */
export function r2Loader(options: R2LoaderOptions): Loader {
  return {
    name: 'r2-loader',
    load: async ({ store, logger, generateDigest }) => {
      logger.info(`Loading posts from R2 bucket: ${options.bucket}`);

      // 環境変数から認証情報を取得（オプションで上書き可能）
      const endpoint = options.endpoint ?? import.meta.env.R2_ENDPOINT ?? process.env.R2_ENDPOINT;
      const accessKeyId = options.accessKeyId ?? import.meta.env.R2_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
      const secretAccessKey = options.secretAccessKey ?? import.meta.env.R2_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
      const publicUrl = options.publicUrl ?? import.meta.env.R2_PUBLIC_URL ?? process.env.R2_PUBLIC_URL;

      if (!endpoint || !accessKeyId || !secretAccessKey) {
        throw new Error(
          'R2 credentials not found. Please set R2_ENDPOINT, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY in environment variables.'
        );
      }

      if (publicUrl) {
        logger.info(`R2 public URL configured: ${publicUrl}`);
      } else {
        logger.warn('R2_PUBLIC_URL not set. Image URLs will not be transformed.');
      }

      // R2クライアント初期化
      const client = new R2Client(endpoint, accessKeyId, secretAccessKey);

      try {
        // ストアをクリア（全記事を再取得）
        store.clear();

        // Markdownファイル一覧を取得
        const fileKeys = await client.listMarkdownFiles(options.bucket);
        logger.info(`Found ${fileKeys.length} markdown files in R2`);

        // 各ファイルを処理
        for (const key of fileKeys) {
          try {
            // ファイル内容を取得
            const content = await client.getMarkdownContent(options.bucket, key);

            // frontmatterをパース
            const { data, content: body } = matter(content);

            // ObsidianのローカルMarkdown画像記法をR2公開URLに変換
            const transformedBody = publicUrl ? transformImageUrls(body, publicUrl) : body;

            // coverImageをR2公開URLに変換
            if (data.coverImage && typeof data.coverImage === 'string' && publicUrl) {
              data.coverImage = transformCoverImageUrl(data.coverImage, publicUrl);
            }

            // IDを生成
            // 1. frontmatterにslugがあればそれを使用
            // 2. なければファイル名のハッシュ値を生成（短縮版）
            const id = data.slug || createHash('md5').update(key).digest('hex').substring(0, 12);

            // Content Collectionにエントリーを追加
            store.set({
              id,
              data,
              body: transformedBody,
              // digestを生成してキャッシュ管理
              digest: generateDigest(content),
            });

            logger.info(`Loaded: ${id}`);
          } catch (error) {
            logger.error(`Failed to load ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

        logger.info(`Successfully loaded ${fileKeys.length} posts from R2`);
      } catch (error) {
        logger.error(`Failed to load from R2: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
  };
}
