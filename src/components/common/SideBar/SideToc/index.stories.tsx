import type { Meta, StoryObj } from '@storybook/react'

import { SideToc } from './'
import { handlers } from '/mocks/handlers'
import testData from '/mocks/test-data/blog/index'
import { parseHeading } from '/libs/parse/parseHeading'

const meta: Meta<typeof SideToc> = {
  component: SideToc,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
}

export default meta
type Story = StoryObj<typeof SideToc>

export const Primary: Story = {
  args: {
    headings: parseHeading(testData[1].body)
  },
}
