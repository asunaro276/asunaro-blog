import type { Meta, StoryObj } from "@storybook/react";
import PaginationItem from "./index";

const meta: Meta<typeof PaginationItem> = {
  title: "HomePage/PaginationItem",
  component: PaginationItem,
  decorators: [
    (Story) => (
      <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0, gap: "4px" }}>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    to: "/1",
    children: "1",
    disabled: true,
    number: true,
  },
};

export const Inactive: Story = {
  args: {
    to: "/2",
    children: "2",
    disabled: false,
    hover: true,
    number: true,
  },
};

export const PrevButton: Story = {
  args: {
    to: "/1",
    children: "←",
    disabled: false,
    hover: true,
  },
};

export const NextButton: Story = {
  args: {
    to: "/3",
    children: "→",
    disabled: false,
    hover: true,
  },
};
