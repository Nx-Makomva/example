import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { CheckInForm } from "./CheckInForm";

const meta = {
  title: "Features/CheckInForm",
  component: CheckInForm,
} satisfies Meta<typeof CheckInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Submitted: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText("Low"));
    await userEvent.click(canvas.getByRole("button", { name: "Send check-in" }));
    await expect(canvas.getByText("Thanks for checking in")).toBeVisible();
  },
};
