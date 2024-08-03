import type { Meta, StoryObj } from '@storybook/react'

import { SideBar } from './index.astro'
import { handlers } from '/mocks/handlers'
import testData from '/mocks/test-data/blog/index'
import tagData from '/mocks/test-data/tag.json'
import yearmonthData from '/mocks/test-data/yearmonth.json'
import { parseHeading } from '/libs/parse/parseHeading'

const meta: Meta<typeof SideBar> = {
  component: SideBar,
  parameters: {
    msw: {
      handlers: [...handlers],
    },
  },
}

export default meta
type Story = StoryObj<typeof SideBar>

export const Primary: Story = {
  args: {
    headings: parseHeading(testData[1].body),
    tags: tagData.items,
    yearmonths: yearmonthData.items,
  },
}
