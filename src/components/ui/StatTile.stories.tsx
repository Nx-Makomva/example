import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatTile } from "./StatTile";

const meta = {
  title: "UI/StatTile",
  component: StatTile,
  args: { label: "Checked in today", value: "6/7", hint: "Morning registration" },
} satisfies Meta<typeof StatTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Concern: Story = {
  args: { label: "Need a follow-up", value: 2, hint: "Said they feel low or are struggling", tone: "concern" },
};
