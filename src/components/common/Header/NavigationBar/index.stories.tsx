import type { Meta, StoryObj } from '@storybook/react'

import { NavigationBar } from './'
import { handlers } from '/mocks/handlers'
import categoryData from '/mocks/test-data/category.json'

const meta: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
}

export default meta
type Story = StoryObj<typeof NavigationBar>

export const Primary: Story = {
  args: {
    logo: 'ASUNAROBLOG',
    categories: categoryData.items
  },
}
