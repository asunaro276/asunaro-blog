import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  type ListObjectsV2CommandOutput,
} from '@aws-sdk/client-s3';

/**
 * Cloudflare R2クライアント
 * S3互換APIを使用してR2バケットからMarkdownファイルを取得
 */
export class R2Client {
  private client: S3Client;

  constructor(
    endpoint: string,
    accessKeyId: string,
    secretAccessKey: string
  ) {
    this.client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  /**
   * バケット内のMarkdownファイル一覧を取得
   * @param bucket バケット名
   * @returns Markdownファイルのキー一覧
   */
  async listMarkdownFiles(bucket: string): Promise<string[]> {
    const files: string[] = [];
    let continuationToken: string | undefined;

    do {
      const command = new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: continuationToken,
      });

      const response: ListObjectsV2CommandOutput = await this.client.send(command);

      if (response.Contents) {
        const markdownFiles = response.Contents
          .filter((obj) => obj.Key?.endsWith('.md'))
          .map((obj) => obj.Key!)
          .filter((key) => key !== undefined);

        files.push(...markdownFiles);
      }

      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return files;
  }

  /**
   * Markdownファイルの内容を取得
   * @param bucket バケット名
   * @param key ファイルキー
   * @returns Markdownファイルの内容
   */
  async getMarkdownContent(bucket: string, key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await this.client.send(command);

    if (!response.Body) {
      throw new Error(`Failed to get content from R2: ${key}`);
    }

    return await response.Body.transformToString('utf-8');
  }

  /**
   * 複数のMarkdownファイルを並列取得
   * @param bucket バケット名
   * @param keys ファイルキーの配列
   * @returns ファイル内容のマップ（キー: ファイルキー, 値: 内容）
   */
  async getMarkdownContents(
    bucket: string,
    keys: string[]
  ): Promise<Map<string, string>> {
    const contentPromises = keys.map(async (key) => {
      const content = await this.getMarkdownContent(bucket, key);
      return [key, content] as const;
    });

    const results = await Promise.all(contentPromises);
    return new Map(results);
  }
}
