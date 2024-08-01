import type { Meta, StoryObj } from '@storybook/react'

import { HomePage } from './'
import { handlers } from '/mocks/handlers'
import testData from '/mocks/test-data/index.json'
import categoryData from '/mocks/test-data/category.json'
import tagData from '/mocks/test-data/tag.json'
import yearmonthData from '/mocks/test-data/yearmonth.json'
import { modes } from '/.storybook/modes'

const meta: Meta<typeof HomePage> = {
  component: HomePage,
  title: 'page/HomePage',
  parameters: {
    msw: {
      handlers: [...handlers],
    },
    chromatic: {
      modes: {
        mobile: modes['small'],
        desktop: modes['large']     
      },
      disableSnapshot: false
    }
  },
}

export default meta
type Story = StoryObj<typeof HomePage>

export const Home: Story = {
  name: 'トップページ',
  args: {
    pageNumber: 1,
    blogs: testData.items,
    categories: categoryData.items,
    tags: tagData.items,
    yearmonths: yearmonthData.items,
    totalCount: 20,
  },
}

export const Category: Story = {
  name: 'カテゴリーページ',
  args: {
    pageNumber: 1,
    blogs: testData.items,
    categories: categoryData.items,
    tags: tagData.items,
    yearmonths: yearmonthData.items,
    totalCount: 20,
    category: categoryData.items[3]
  },
}

export const Tag: Story = {
  name: 'タグページ',
  args: {
    pageNumber: 1,
    blogs: testData.items,
    categories: categoryData.items,
    tags: tagData.items,
    yearmonths: yearmonthData.items,
    totalCount: 20,
    tag: tagData.items[0]
  },
}

export const Error404: Story = {
  name: 'Not Foundページ',
  args: {
    pageNumber: 1,
    blogs: testData.items,
    categories: categoryData.items,
    tags: tagData.items,
    yearmonths: yearmonthData.items,
    totalCount: 20,
    statusCode: 404
  },
}
