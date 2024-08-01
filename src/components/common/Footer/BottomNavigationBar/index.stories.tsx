import type { Meta, StoryObj } from '@storybook/react'

import { BottomNavigationBar } from './'
import categoryData from '/mocks/test-data/category.json'

const meta: Meta<typeof BottomNavigationBar> = {
  component: BottomNavigationBar,
}

export default meta
type Story = StoryObj<typeof BottomNavigationBar>

export const Primary: Story = {
  args: {
    categories: categoryData.items
  }
}
