import { test, expect } from '@playwright/test';

test.describe('サイドバー', () => {
  test('"About" ラベルが存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-sidebar]').getByText('About')).toBeVisible();
  });

  test('アバターの border-radius が 9999px で幅が 88px である', async ({ page }) => {
    await page.goto('/');
    const avatar = page.locator('[data-sidebar-avatar]');
    await expect(avatar).toBeVisible();
    const br = await avatar.evaluate(el => parseFloat(getComputedStyle(el).borderRadius));
    const w = await avatar.evaluate(el => parseFloat(getComputedStyle(el).width));
    expect(br).toBeGreaterThanOrEqual(9999);
    expect(w).toBe(88);
  });

  test('名前テキストの font-family が Noto Serif JP で font-size が 20px である', async ({ page }) => {
    await page.goto('/');
    const name = page.locator('[data-sidebar-name]');
    await expect(name).toBeVisible();
    const ff = await name.evaluate(el => getComputedStyle(el).fontFamily);
    const fs = await name.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(ff.toLowerCase()).toContain('noto serif jp');
    expect(fs).toBe(20);
  });

  test('"GITHUB ↗" と "X ↗" リンクが存在する', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.locator('[data-sidebar]');
    await expect(sidebar.getByText('GITHUB ↗')).toBeVisible();
    await expect(sidebar.getByText('X ↗')).toBeVisible();
  });

  test('"Tags" ラベルが存在する', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-sidebar]').getByText('Tags')).toBeVisible();
  });

  test('タグチップに border: 1px solid と border-radius: 99px が適用される', async ({ page }) => {
    await page.goto('/');
    const chip = page.locator('[data-tag-chip-sidebar]').first();
    await expect(chip).toBeVisible();
    const br = await chip.evaluate(el => parseFloat(getComputedStyle(el).borderRadius));
    const bs = await chip.evaluate(el => getComputedStyle(el).borderStyle);
    expect(br).toBeGreaterThanOrEqual(99);
    expect(bs).toContain('solid');
  });

  test('タグチップ内に記事数が JetBrains Mono フォントで表示される', async ({ page }) => {
    await page.goto('/');
    const count = page.locator('[data-tag-count]').first();
    await expect(count).toBeVisible();
    const ff = await count.evaluate(el => getComputedStyle(el).fontFamily);
    expect(ff.toLowerCase()).toContain('jetbrains mono');
  });

  test('"Archive" ラベルと "by month" テキストが存在する', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.locator('[data-sidebar]');
    await expect(sidebar.getByText('Archive')).toBeVisible();
    await expect(sidebar.getByText('by month')).toBeVisible();
  });

  test('各年のヒートマップに12個のセルが存在する', async ({ page }) => {
    await page.goto('/');
    const yearRow = page.locator('[data-heatmap-year]').first();
    if (await yearRow.count() > 0) {
      const cells = yearRow.locator('[data-heatmap-cell]');
      await expect(cells).toHaveCount(12);
    }
  });

  test('凡例の4段階カラーチップが表示される', async ({ page }) => {
    await page.goto('/');
    const legend = page.locator('[data-heatmap-legend="true"]');
    await expect(legend).toBeVisible();
    const chips = legend.locator('[data-legend-chip]');
    await expect(chips).toHaveCount(4);
  });
});
