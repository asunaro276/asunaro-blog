import type { Page } from '@playwright/test';

export async function getCssVar(page: Page, varName: string): Promise<string> {
  return page.evaluate((name) => {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }, varName);
}

export async function getThemeClass(page: Page): Promise<string> {
  return page.evaluate(() => {
    const classes = document.documentElement.classList;
    if (classes.contains('theme-dark')) return 'theme-dark';
    if (classes.contains('theme-light')) return 'theme-light';
    return '';
  });
}
