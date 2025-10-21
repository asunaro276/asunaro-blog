import type { Loader } from 'astro/loaders';
import matter from 'gray-matter';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * coverImageのパスを絶対パスまたはURLに変換
 * - cover.webp → /images/cover.webp
 * - ../assets/cover.png → /images/cover.png (正規化)
 * - ./assets/cover.png → /images/assets/cover.png
 * - https://... → そのまま（既にURL）
 */
function transformLocalCoverImagePath(coverImage: string): string {
  // 既にURLの場合はそのまま
  if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) {
    return coverImage;
  }

  // 既に絶対パス（/で始まる）の場合はそのまま
  if (coverImage.startsWith('/')) {
    return coverImage;
  }

  // 相対パス記号を除去
  let cleanPath = coverImage;
  if (cleanPath.startsWith('../assets/')) {
    cleanPath = cleanPath.replace('../assets/', '');
  } else if (cleanPath.startsWith('./assets/')) {
    cleanPath = cleanPath.replace('./assets/', '');
  } else if (cleanPath.startsWith('./')) {
    cleanPath = cleanPath.replace('./', '');
  }

  // /images/ で始まる絶対パスに変換
  return `/assets/${cleanPath}`;
}

/**
 * 指定ディレクトリから再帰的にMarkdownファイルを取得
 */
async function getMarkdownFiles(baseDir: string): Promise<string[]> {
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  await walk(baseDir);
  return files;
}

export interface LocalMarkdownLoaderOptions {
  pattern: string;
  base: string;
}

/**
 * ローカルMarkdown用のカスタムLoader
 * coverImageをローカル相対パスに変換
 */
export function localMarkdownLoader(options: LocalMarkdownLoaderOptions): Loader {
  return {
    name: 'local-markdown-loader',
    load: async ({ store, logger, generateDigest }) => {
      logger.info(`Loading local markdown files from: ${options.base}`);

      try {
        // ストアをクリア
        store.clear();

        // baseディレクトリからMarkdownファイルを再帰的に取得
        const files = await getMarkdownFiles(options.base);
        logger.info(`Found ${files.length} markdown files`);

        // 各ファイルを処理
        for (const filePath of files) {
          try {
            // ファイル内容を読み込み
            const content = await fs.readFile(filePath, 'utf-8');

            // frontmatterをパース
            const { data, content: body } = matter(content);

            // coverImageを変換
            if (data.coverImage && typeof data.coverImage === 'string') {
              data.coverImage = transformLocalCoverImagePath(data.coverImage);
            }

            // IDを生成（ファイル名から拡張子を除いたもの）
            const id = path.basename(filePath, '.md');

            // Content Collectionにエントリーを追加
            store.set({
              id,
              data,
              body,
              digest: generateDigest(content),
            });

            logger.info(`Loaded: ${id}`);
          } catch (error) {
            logger.error(
              `Failed to load ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
          }
        }

        logger.info(`Successfully loaded ${files.length} posts`);
      } catch (error) {
        logger.error(`Failed to load local markdown: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
      }
    },
  };
}
