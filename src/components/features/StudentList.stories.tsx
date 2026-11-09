import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { needsFollowUp, STUDENTS } from "@/lib/students";

import { StudentList } from "./StudentList";

const meta = {
  title: "Features/StudentList",
  component: StudentList,
  args: { students: STUDENTS },
} satisfies Meta<typeof StudentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WholeClass: Story = {};

export const NeedsAttention: Story = { args: { students: STUDENTS.filter(needsFollowUp) } };

export const Empty: Story = {
  args: { students: [], emptyMessage: "Everyone seems okay today." },
};
