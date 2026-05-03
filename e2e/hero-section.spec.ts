import { test, expect } from '@playwright/test';
import { SIZES } from './fixtures/design-tokens';

test.describe('ヒーローセクション', () => {
  test('トップページに hero-section 要素が存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
  });

  test('"FEATURED" テキストが accent 色で表示される', async ({ page }) => {
    await page.goto('/');
    const featured = page.locator('[data-testid="hero-section"] [data-featured-label]');
    await expect(featured).toBeVisible();
    const color = await featured.evaluate(el => getComputedStyle(el).color);
    expect(color).toContain('oklch');
  });

  test('ヒーロータイトルの font-size が 52px である', async ({ page, isMobile }) => {
    test.skip(isMobile, 'モバイルはフォントサイズが異なる');
    await page.goto('/');
    const title = page.locator('[data-testid="hero-section"] [data-hero-title]');
    await expect(title).toBeVisible();
    const fontSize = await title.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(fontSize).toBe(SIZES.heroTitle);
  });

  test('ヒーロータイトルに Noto Serif JP フォントが適用されている', async ({ page }) => {
    await page.goto('/');
    const title = page.locator('[data-testid="hero-section"] [data-hero-title]');
    const fontFamily = await title.evaluate(el => getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain('noto serif jp');
  });

  test('タグチップの border-radius が 99px である', async ({ page }) => {
    await page.goto('/');
    const tag = page.locator('[data-testid="hero-section"] [data-tag-chip]').first();
    const br = await tag.evaluate(el => parseFloat(getComputedStyle(el).borderRadius));
    expect(br).toBeGreaterThanOrEqual(99);
  });

  test('「本文を読む →」リンクが存在する', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('[data-testid="hero-section"]').getByText(/本文を読む/);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /\/blog\//);
  });

  test('ヒーロー画像エリアの aspect-ratio が 3/2 である', async ({ page }) => {
    await page.goto('/');
    const img = page.locator('[data-testid="hero-section"] [data-hero-image]');
    const ar = await img.evaluate(el => getComputedStyle(el).aspectRatio);
    expect(ar).toBe('3 / 2');
  });
});
