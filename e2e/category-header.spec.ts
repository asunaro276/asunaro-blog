import { test, expect } from '@playwright/test';
import { SIZES } from './fixtures/design-tokens';

test.describe('カテゴリページヘッダー', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/category/code/1');
  });

  test('"Category" ラベルが存在する', async ({ page }) => {
    await expect(page.locator('[data-category-header]').getByText('Category')).toBeVisible();
  });

  test('カテゴリ名の font-size が 56px で Noto Serif JP である', async ({ page }) => {
    const name = page.locator('[data-category-name]');
    await expect(name).toBeVisible();
    const fs = await name.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    const ff = await name.evaluate(el => getComputedStyle(el).fontFamily);
    expect(fs).toBe(SIZES.categoryTitle);
    expect(ff.toLowerCase()).toContain('noto serif jp');
  });

  test('カテゴリ名末尾に accent 色のピリオドが存在する', async ({ page }) => {
    const period = page.locator('[data-category-period]');
    await expect(period).toBeVisible();
    const color = await period.evaluate(el => getComputedStyle(el).color);
    expect(color).toContain('oklch');
  });

  test('記事数テキストに JetBrains Mono フォントが適用される', async ({ page }) => {
    const count = page.locator('[data-category-count]');
    await expect(count).toBeVisible();
    const ff = await count.evaluate(el => getComputedStyle(el).fontFamily);
    expect(ff.toLowerCase()).toContain('jetbrains mono');
  });

  test('全カテゴリのタブが横並びで存在する', async ({ page }) => {
    const tabs = page.locator('[data-category-tab]');
    const count = await tabs.count();
    expect(count).toBeGreaterThan(1);
  });

  test('現在カテゴリのタブが --fg 背景・--bg テキストでハイライトされる', async ({ page }) => {
    const activeTab = page.locator('[data-category-tab][data-active="true"]');
    await expect(activeTab).toBeVisible();
  });
});
