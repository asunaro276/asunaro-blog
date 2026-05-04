import type { Meta, StoryObj } from "@storybook/react";
import { Category } from "/domain/models/article/category/Category";
import Footer from "./index.astro";

const meta: Meta<typeof Footer> = {
  title: "common/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [
      new Category("tech", "Tech"),
      new Category("business", "Business"),
      new Category("math", "Math"),
      new Category("other", "Other"),
    ],
  },
};
