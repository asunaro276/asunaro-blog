import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "/domain/models/article/Article";
import { Category } from "/domain/models/article/category/Category";
import { CoverImage } from "/domain/models/article/cover-image/CoverImage";
import { Tag } from "/domain/models/article/tag/Tag";
import PostCard from "./index.astro";

const meta: Meta<typeof PostCard> = {
  title: "HomePage/PostCard",
  component: PostCard,
  parameters: {
    layout: "padded",
    viewport: {
      defaultViewport: "postcard",
      viewports: {
        postcard: {
          name: "PostCard",
          styles: { width: "160px", height: "300px" },
          type: "mobile" as const,
        },
      },
    },
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

const category = new Category("tech", "Tech");
const tags = [new Tag("typescript", "TypeScript"), new Tag("react", "React")];

const coverImage = new CoverImage(
  "Sample Cover",
  "Sample cover image",
  "",
  "sample.jpg",
  630,
  1200,
  "https://placehold.co/1200x630/2D3B2F/F9FAF7?text=Cover"
);

const articleWithCover = Article.create(
  "sample-article-1",
  "TypeScriptで学ぶドメイン駆動設計の実践",
  "ドメイン駆動設計（DDD）の基本概念をTypeScriptで実装しながら学ぶ記事です。",
  coverImage,
  category,
  tags,
  "<p>記事本文</p>",
  "2024-10-01T00:00:00.000Z",
  "2024-10-01T00:00:00.000Z"
);

const articleWithoutCover = Article.create(
  "sample-article-2",
  "Astroで静的サイトを構築する方法",
  "",
  new CoverImage("", "", "", "", 0, 0, "/images/default-cover.jpg"),
  new Category("other", "Other"),
  [],
  "<p>記事本文</p>",
  "2024-06-15T00:00:00.000Z",
  "2024-06-15T00:00:00.000Z"
);

export const WithCoverImage: Story = {
  args: {
    article: articleWithCover,
  },
};

export const WithoutCoverImage: Story = {
  args: {
    article: articleWithoutCover,
  },
};
