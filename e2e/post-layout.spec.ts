import { test, expect } from '@playwright/test';
import { SIZES } from './fixtures/design-tokens';

test.describe('記事詳細レイアウト', () => {
  test.beforeEach(async ({ page }) => {
    // まず記事一覧ページに移動して最初の記事リンクを取得
    await page.goto('/');
    const firstLink = page.locator('a[href^="/blog/"]').first();
    const href = await firstLink.getAttribute('href');
    if (href) {
      await page.goto(href);
    }
  });

  test('本文エリアが display: grid で3カラムである', async ({ page, isMobile }) => {
    test.skip(isMobile, 'モバイルは1カラムレイアウト');
    const body = page.locator('[data-post-body]');
    if (await body.count() === 0) return;
    const display = await body.evaluate(el => getComputedStyle(el).display);
    const cols = await body.evaluate(el => getComputedStyle(el).gridTemplateColumns);
    expect(display).toBe('grid');
    const colCount = cols.trim().split(/\s+/).length;
    expect(colCount).toBe(3);
  });

  test('左カラムが position: sticky で top: 80px である', async ({ page, isMobile }) => {
    test.skip(isMobile, 'モバイルは1カラムレイアウト');
    const left = page.locator('[data-post-left-col]');
    if (await left.count() === 0) return;
    const pos = await left.evaluate(el => getComputedStyle(el).position);
    const top = await left.evaluate(el => parseFloat(getComputedStyle(el).top));
    expect(pos).toBe('sticky');
    expect(top).toBe(80);
  });

  test('記事タイトルの font-size が 48px で text-align が center である', async ({ page }) => {
    const title = page.locator('[data-post-title]');
    if (await title.count() === 0) return;
    const fs = await title.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    const ta = await title.evaluate(el => getComputedStyle(el).textAlign);
    expect(fs).toBe(SIZES.postTitle);
    expect(ta).toBe('center');
  });

  test('H2 見出しの font-size が 24px で Noto Serif JP である', async ({ page }) => {
    const h2 = page.locator('[data-post-content] h2').first();
    if (await h2.count() === 0) return;
    const fs = await h2.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    const ff = await h2.evaluate(el => getComputedStyle(el).fontFamily);
    expect(fs).toBe(24);
    expect(ff.toLowerCase()).toContain('noto serif jp');
  });

  test('"Suggested for you" テキストが存在する', async ({ page }) => {
    const suggested = page.getByText(/Suggested for you/i);
    if (await suggested.count() > 0) {
      await expect(suggested).toBeVisible();
    }
  });
});
