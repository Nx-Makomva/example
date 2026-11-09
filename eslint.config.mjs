import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const TOKEN_HINT = "Use a design token from src/app/globals.css (e.g. bg-concern, text-text-muted).";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Design-system guardrails. Tailwind's default palette is already disabled,
    // so these close the remaining escape hatches: arbitrary values like
    // `bg-[#ff0000]`, raw hex codes and inline styles.
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/\\[#|#[0-9a-fA-F]{3,8}\\b|\\[\\d+px\\]/]",
          message: `Raw colours or pixel values bypass the design system. ${TOKEN_HINT}`,
        },
        {
          selector: "TemplateElement[value.raw=/\\[#|#[0-9a-fA-F]{3,8}\\b|\\[\\d+px\\]/]",
          message: `Raw colours or pixel values bypass the design system. ${TOKEN_HINT}`,
        },
        {
          selector: "JSXAttribute[name.name='style']",
          message: `Inline styles bypass the design system. ${TOKEN_HINT}`,
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
