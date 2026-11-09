import { defineConfig, devices } from "@playwright/test";

const STORYBOOK_PORT = 6007;

export default defineConfig({
  testDir: "./tests/visual",
  // Baselines are always made in the Linux Docker container
  // (scripts/visual-tests-docker.sh), so the path drops Playwright's default
  // per-OS suffix.
  snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  // Locally too, so designers can open playwright-report/index.html and compare
  // expected, actual and diff images side by side.
  reporter: process.env.CI
    ? [["html", { open: "never" }], ["github"]]
    : [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      // Tolerates anti-aliasing noise while still catching a 1px border change.
      maxDiffPixelRatio: 0.001,
      animations: "disabled",
    },
  },
  use: {
    baseURL: `http://localhost:${STORYBOOK_PORT}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `pnpm exec vite preview --outDir storybook-static --port ${STORYBOOK_PORT} --strictPort`,
    port: STORYBOOK_PORT,
    reuseExistingServer: !process.env.CI,
  },
});
