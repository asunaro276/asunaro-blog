import { test, expect } from '@playwright/test';

test.describe('記事カード', () => {
  test('カードの画像エリアの aspect-ratio が 4/3 である', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('[data-card-image]').first();
    await expect(img).toBeVisible();
    const ar = await img.evaluate(el => getComputedStyle(el).aspectRatio);
    expect(ar).toBe('4 / 3');
  });

  test('カテゴリラベルの letter-spacing と text-transform が正しい', async ({ page }) => {
    await page.goto('/');
    const label = page.locator('[data-card-category]').first();
    await expect(label).toBeVisible();
    const ls = await label.evaluate(el => getComputedStyle(el).letterSpacing);
    const tt = await label.evaluate(el => getComputedStyle(el).textTransform);
    // letter-spacing: 0.18em relative to font-size (approx 2.16px at 12px)
    expect(parseFloat(ls)).toBeGreaterThan(1);
    expect(tt).toBe('uppercase');
  });

  test('日付テキストに JetBrains Mono フォントが適用される', async ({ page }) => {
    await page.goto('/');
    const date = page.locator('[data-card-date]').first();
    await expect(date).toBeVisible();
    const fontFamily = await date.evaluate(el => getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain('jetbrains mono');
  });

  test('見出しの font-family が Noto Serif JP で font-weight が 600 である', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('[data-card-title]').first();
    await expect(heading).toBeVisible();
    const ff = await heading.evaluate(el => getComputedStyle(el).fontFamily);
    const fw = await heading.evaluate(el => getComputedStyle(el).fontWeight);
    expect(ff.toLowerCase()).toContain('noto serif jp');
    expect(parseInt(fw)).toBeGreaterThanOrEqual(600);
  });

  test('タグが #タグ名 形式で表示される', async ({ page }) => {
    await page.goto('/');
    const tag = page.locator('[data-card-tag]').first();
    const text = await tag.textContent();
    expect(text?.trim()).toMatch(/^#/);
  });

  test('トップページの記事グリッドが 3カラムである', async ({ page, isMobile }) => {
    test.skip(isMobile, 'モバイルは1カラムレイアウト');
    await page.goto('/');
    const grid = page.locator('[data-articles-grid]');
    await expect(grid).toBeVisible();
    const cols = await grid.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    const colCount = cols.trim().split(/\s+/).length;
    expect(colCount).toBeGreaterThanOrEqual(3);
  });
});
