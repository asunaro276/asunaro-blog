import { test, expect } from '@playwright/test';
import { getCssVar } from './helpers/theme';

test.describe('サイトヘッダー', () => {
  test('ヘッダーが sticky で top: 0 である', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header').first();
    const position = await header.evaluate(el => getComputedStyle(el).position);
    const top = await header.evaluate(el => getComputedStyle(el).top);
    expect(position).toBe('sticky');
    expect(top).toBe('0px');
  });

  test('ヘッダーに backdrop-filter blur が適用されている', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header').first();
    const bf = await header.evaluate(el => getComputedStyle(el).backdropFilter);
    expect(bf).toContain('blur');
  });

  test('"asunaro" と "blog" テキストが存在し "blog" が accent 色である', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header').getByText('asunaro', { exact: false }).first()).toBeVisible();
    const accentEl = page.locator('header span[style*="--accent"]').first();
    await expect(accentEl).toBeVisible();
    await expect(accentEl).toHaveText('blog');
  });

  test('"since 2022" テキストが JetBrains Mono フォントで表示される', async ({ page }) => {
    await page.goto('/');
    const sinceEl = page.locator('header').getByText('since 2022');
    await expect(sinceEl).toBeVisible();
    const fontFamily = await sinceEl.evaluate(el => getComputedStyle(el).fontFamily);
    expect(fontFamily.toLowerCase()).toContain('jetbrains mono');
  });

  test('5つのナビ項目が存在する', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('header nav');
    const links = nav.locator('a');
    await expect(links).toHaveCount(5);
  });

  test('SEARCH と RSS テキストがヘッダー右側に存在する', async ({ page, isMobile }) => {
    test.skip(isMobile, 'モバイルはハンバーガーメニュー');
    await page.goto('/');
    await expect(page.locator('header').getByText('SEARCH')).toBeVisible();
    await expect(page.locator('header').getByText('RSS ↗')).toBeVisible();
  });

  test('スクロール後もヘッダーが top:0 である', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 500));
    const header = page.locator('header').first();
    const rectTop = await header.evaluate(el => el.getBoundingClientRect().top);
    expect(rectTop).toBe(0);
  });
});
