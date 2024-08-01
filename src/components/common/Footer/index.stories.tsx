import type { Meta, StoryObj } from '@storybook/react'

import { Footer } from './'
import categoryData from '/mocks/test-data/category.json'

const meta: Meta<typeof Footer> = {
  component: Footer,
}

export default meta
type Story = StoryObj<typeof Footer>

export const Primary: Story = {
  args: {
    categories: categoryData.items
  }
}
