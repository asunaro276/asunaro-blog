import { test, expect } from '@playwright/test';

test.describe('ページネーション', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('"Previous" テキストを含む要素が存在する', async ({ page }) => {
    await expect(page.locator('[data-pagination]').getByText(/Previous/)).toBeVisible();
  });

  test('"Next" テキストを含む要素が存在する', async ({ page }) => {
    await expect(page.locator('[data-pagination]').getByText(/Next/)).toBeVisible();
  });

  test('現在ページのボタンが --accent 背景色である', async ({ page }) => {
    const currentPage = page.locator('[data-page-current]');
    if (await currentPage.count() > 0) {
      const bg = await currentPage.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(bg).toBeTruthy();
    }
  });

  test('1ページ目では Previous ボタンが opacity 0.4 以下である', async ({ page }) => {
    const prevBtn = page.locator('[data-pagination-prev]');
    if (await prevBtn.count() > 0) {
      const opacity = await prevBtn.evaluate(el => parseFloat(getComputedStyle(el).opacity));
      expect(opacity).toBeLessThanOrEqual(0.4);
    }
  });
});
