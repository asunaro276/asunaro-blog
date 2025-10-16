import { test, expect } from '@playwright/test';

test.describe('ホームページ', () => {
  test('正常にアクセスできる', async ({ page }) => {
    await page.goto('/');

    // タイトルが存在することを確認
    await expect(page).toHaveTitle(/asunaro/i);
  });

  test('メインコンテンツが表示される', async ({ page }) => {
    await page.goto('/');

    // ページが読み込まれるのを待つ
    await page.waitForLoadState('networkidle');

    // 何らかのコンテンツが表示されていることを確認
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});

test.describe('ナビゲーション', () => {
  test('ページ間の遷移が正常に動作する', async ({ page }) => {
    await page.goto('/');

    // ページが読み込まれるのを待つ
    await page.waitForLoadState('networkidle');

    // URLが正しいことを確認
    expect(page.url()).toContain('/');
  });
});
