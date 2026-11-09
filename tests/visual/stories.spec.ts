import { readFileSync } from "node:fs";
import path from "node:path";

import { expect, test } from "@playwright/test";

interface StorybookIndexEntry {
  id: string;
  type: "story" | "docs";
}

const STORYBOOK_INDEX_PATH = path.join(process.cwd(), "storybook-static", "index.json");

// Every story becomes a visual test automatically: add a story, get a screenshot.
const storybookIndex: { entries: Record<string, StorybookIndexEntry> } = JSON.parse(
  readFileSync(STORYBOOK_INDEX_PATH, "utf-8"),
);
const storyIds = Object.values(storybookIndex.entries)
  .filter((entry) => entry.type === "story")
  .map((entry) => entry.id);

for (const storyId of storyIds) {
  test(storyId, async ({ page }) => {
    await page.goto(`/iframe.html?id=${storyId}&viewMode=story`);
    await page.locator("#storybook-root").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${storyId}.png`, { fullPage: true });
  });
}
