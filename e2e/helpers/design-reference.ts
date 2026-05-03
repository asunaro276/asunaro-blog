import type { Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

type SlotId = 'home' | 'post' | 'category';
type Theme = 'light' | 'dark';

export async function screenshotArtboard(
  page: Page,
  slotId: SlotId,
  theme: Theme,
  outputPath?: string
): Promise<Buffer> {
  await page.goto('http://localhost:4322/Rebrand.html');
  await page.waitForSelector('[data-dc-slot]');

  if (theme === 'dark') {
    await page.evaluate(() => {
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
    });
  } else {
    await page.evaluate(() => {
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
    });
  }

  const card = page.locator(`[data-dc-slot="${slotId}"] .dc-card`).first();
  const screenshot = await card.screenshot();

  if (outputPath) {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, screenshot);
  }

  return screenshot;
}
