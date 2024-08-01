import type { Meta, StoryObj } from '@storybook/react'

import { SideTags } from './'
import { handlers } from '/mocks/handlers'
import tagsData from '/mocks/test-data/tag.json'

const meta: Meta<typeof SideTags> = {
  component: SideTags,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
}

export default meta
type Story = StoryObj<typeof SideTags>

export const Primary: Story = {
  args: {
    tags: tagsData.items,
  },
}
