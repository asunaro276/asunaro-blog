import type { Meta, StoryObj } from "@storybook/react";
import ArchiveHeatmap from "./index.tsx";

const meta: Meta<typeof ArchiveHeatmap> = {
  title: "common/SideBar/ArchiveHeatmap",
  component: ArchiveHeatmap,
  parameters: {
    renderer: "react",
    viewport: {
      defaultViewport: "sidebar",
      viewports: {
        sidebar: {
          name: "Sidebar",
          styles: { width: "280px", height: "600px" },
          type: "mobile" as const,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleYearmonths = [
  { year: 2024, month: 10, count: 3, value: "2024-10" },
  { year: 2024, month: 7, count: 2, value: "2024-7" },
  { year: 2024, month: 6, count: 1, value: "2024-6" },
  { year: 2023, month: 11, count: 4, value: "2023-11" },
  { year: 2023, month: 10, count: 2, value: "2023-10" },
  { year: 2023, month: 6, count: 1, value: "2023-6" },
  { year: 2023, month: 5, count: 3, value: "2023-5" },
  { year: 2023, month: 4, count: 2, value: "2023-4" },
  { year: 2023, month: 3, count: 5, value: "2023-3" },
];

export const Default: Story = {
  args: {
    yearmonths: sampleYearmonths,
  },
};

export const SingleYear: Story = {
  args: {
    yearmonths: sampleYearmonths.filter((ym) => ym.year === 2024),
  },
};

export const Empty: Story = {
  args: {
    yearmonths: [],
  },
};
