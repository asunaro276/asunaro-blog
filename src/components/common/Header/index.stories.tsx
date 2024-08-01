import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './'
import { handlers } from '/mocks/handlers'
import categoryData from '/mocks/test-data/category.json'

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Primary: Story = {
  args: {
    categories: categoryData.items
  },
}
