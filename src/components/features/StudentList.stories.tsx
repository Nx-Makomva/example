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

/** The normal case: needs attention first, then not checked in, then everyone else. */
export const WholeClass: Story = {};

export const NeedsAttention: Story = { args: { students: STUDENTS.filter(needsFollowUp) } };

/** Nobody needs a follow-up, so the first group shows its friendly message. */
export const AllOkay: Story = {
  args: { students: STUDENTS.filter((student) => !needsFollowUp(student)) },
};

/** A very long name should shorten with an ellipsis and never push the badge or button out of the row. */
export const LongName: Story = {
  args: {
    students: [
      {
        id: "long",
        name: "Alexandria Wilhelmina Featherstonehaugh-Cholmondeley",
        latestCheckIn: { mood: "struggling", submittedAt: "2026-11-09T08:44:00Z" },
      },
      ...STUDENTS.slice(0, 2),
    ],
  },
};

export const Empty: Story = {
  args: { students: [], emptyMessage: "Everyone seems okay today." },
};
