import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTones: Story = {
  args: { children: "Badge" },
  render: () => (
    <div className="flex gap-2">
      <Badge>No check-in</Badge>
      <Badge tone="positive">Good</Badge>
      <Badge tone="caution">Low</Badge>
      <Badge tone="concern">Struggling</Badge>
    </div>
  ),
};
