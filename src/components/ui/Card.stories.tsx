import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";
import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  args: {
    title: "Needs attention",
    description: "Students who might want a quiet word today.",
    children: <p>Card content goes here.</p>,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: { action: <Button size="sm" variant="ghost">See all</Button> },
};

export const NoHeader: Story = { args: { title: undefined, description: undefined } };
