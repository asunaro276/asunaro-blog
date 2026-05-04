import type { Meta, StoryObj } from "@storybook/react";
import { Category } from "/domain/models/article/category/Category";
import CategoryHeader from "./index.astro";

const meta: Meta<typeof CategoryHeader> = {
  title: "common/CategoryHeader",
  component: CategoryHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

const techCategory = new Category("tech", "Tech");
const businessCategory = new Category("business", "Business");
const mathCategory = new Category("math", "Math");
const otherCategory = new Category("other", "Other");

export const Default: Story = {
  args: {
    category: techCategory,
    categories: [techCategory],
    totalCount: 42,
  },
};

export const MultipleCategories: Story = {
  args: {
    category: techCategory,
    categories: [techCategory, businessCategory, mathCategory, otherCategory],
    totalCount: 128,
  },
};
