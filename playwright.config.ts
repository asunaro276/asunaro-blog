import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright設定ファイル
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // テストディレクトリ
  testDir: './e2e',

  // 最大実行時間（30秒）
  timeout: 30 * 1000,

  // 並列実行の設定
  fullyParallel: true,

  // CIで失敗時にリトライしない
  forbidOnly: !!process.env.CI,

  // リトライ回数（CIでは2回、ローカルでは0回）
  retries: process.env.CI ? 2 : 0,

  // ワーカー数（CIでは1、ローカルでは未定義）
  workers: process.env.CI ? 1 : undefined,

  // レポーター設定
  reporter: [
    ['html'],
    ['list']
  ],

  // 共通設定
  use: {
    // ベースURL（開発サーバーのURL）
    baseURL: 'http://localhost:4321',

    // スクリーンショット設定
    screenshot: 'only-on-failure',

    // 動画記録設定
    video: 'retain-on-failure',

    // トレース設定
    trace: 'on-first-retry',
  },

  // プロジェクト設定（複数ブラウザでテスト）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // モバイルブラウザのテスト（必要に応じてコメント解除）
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // 開発サーバーの設定
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
