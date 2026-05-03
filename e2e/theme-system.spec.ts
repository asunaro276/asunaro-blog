import { test, expect } from '@playwright/test';
import { getCssVar, getThemeClass } from './helpers/theme';
import { LIGHT, DARK } from './fixtures/design-tokens';

test.describe('テーマシステム', () => {
  test('Light テーマ時に --accent が正しい値を返す', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
    });
    const accent = await getCssVar(page, '--accent');
    expect(accent).toBe(LIGHT.accent);
  });

  test('Dark テーマ時に --accent が正しい値を返す', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
    });
    const accent = await getCssVar(page, '--accent');
    expect(accent).toBe(DARK.accent);
  });

  test('prefers-color-scheme: dark でロード時に theme-dark クラスが付与される', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const themeClass = await getThemeClass(page);
    expect(themeClass).toBe('theme-dark');
  });

  test('テーマトグルボタンをクリックするとテーマが切り替わる', async ({ page }) => {
    await page.goto('/');
    // Light テーマが初期状態
    await page.evaluate(() => {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      localStorage.removeItem('theme');
    });

    const toggleBtn = page.locator('[data-theme-toggle]');
    await toggleBtn.click();

    const themeClass = await getThemeClass(page);
    expect(themeClass).toBe('theme-dark');
  });

  test('テーマ切替後に localStorage に保存される', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      localStorage.removeItem('theme');
    });

    const toggleBtn = page.locator('[data-theme-toggle]');
    await toggleBtn.click();

    const stored = await page.evaluate(() => localStorage.getItem('theme'));
    expect(stored).toBe('dark');
  });

  test('ページリロード後もテーマが保持される', async ({ page }) => {
    await page.goto('/');
    // dark テーマを設定して保存
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.reload();

    const themeClass = await getThemeClass(page);
    expect(themeClass).toBe('theme-dark');
  });
});
