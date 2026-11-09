import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Send check-in" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary", children: "Follow up" } };

export const Ghost: Story = { args: { variant: "ghost", children: "View history" } };

export const Small: Story = { args: { size: "sm" } };

export const Disabled: Story = { args: { disabled: true } };
