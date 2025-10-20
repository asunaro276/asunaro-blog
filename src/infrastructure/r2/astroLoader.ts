import type { Loader } from 'astro/loaders';
import matter from 'gray-matter';
import { R2Client } from './Client';

export interface R2LoaderOptions {
  bucket: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
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

      if (!endpoint || !accessKeyId || !secretAccessKey) {
        throw new Error(
          'R2 credentials not found. Please set R2_ENDPOINT, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY in environment variables.'
        );
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

            // ファイル名からIDを生成（拡張子を除く）
            // 例: "my-post.md" → "my-post"
            const id = key.replace(/\.md$/, '').replace(/^\/+/, '');

            // Content Collectionにエントリーを追加
            store.set({
              id,
              data,
              body,
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
