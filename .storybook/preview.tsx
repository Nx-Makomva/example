import type { Preview } from "@storybook/nextjs-vite";
import { Geist } from "next/font/google";

import "../src/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={`${geistSans.variable} bg-surface p-6 font-sans text-text antialiased`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 'error' fails CI on accessibility violations (e.g. low colour contrast),
    // so a token or component change can't quietly make the product less usable.
    a11y: {
      test: "error",
    },
  },
};

export default preview;
