import { test, expect } from '@playwright/test';

test.describe('サイトフッター', () => {
  test('フッターの grid-template-columns が 4カラムである', async ({ page, isMobile }) => {
    test.skip(isMobile, 'モバイルは縦積みレイアウト');
    await page.goto('/');
    const footer = page.locator('[data-footer-grid]');
    await expect(footer).toBeVisible();
    const cols = await footer.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const colCount = cols.trim().split(/\s+/).length;
    expect(colCount).toBe(4);
  });

  test('フッター内に "asunaroblog" テキストが存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer').getByText('asunaroblog')).toBeVisible();
  });

  test('"Category" "Elsewhere" "Newsletter" ラベルが存在する', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByText('Category')).toBeVisible();
    await expect(footer.getByText('Elsewhere')).toBeVisible();
    await expect(footer.getByText('Newsletter')).toBeVisible();
  });

  test('"GitHub ↗" "X ↗" "RSS ↗" テキストが存在する', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByText('GitHub ↗')).toBeVisible();
    await expect(footer.getByText('X ↗')).toBeVisible();
    await expect(footer.getByText('RSS ↗')).toBeVisible();
  });

  test('コピーライトテキストに JetBrains Mono が適用される', async ({ page }) => {
    await page.goto('/');
    const copyright = page.locator('[data-footer-copyright]');
    await expect(copyright).toBeVisible();
    const ff = await copyright.evaluate(el => getComputedStyle(el).fontFamily);
    expect(ff.toLowerCase()).toContain('jetbrains mono');
  });

  test('"built with Astro · Newt CMS" テキストが存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer').getByText(/built with Astro/)).toBeVisible();
  });
});
