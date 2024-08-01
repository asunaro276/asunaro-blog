import type { Meta, StoryObj } from '@storybook/react'
import ArchivePerYear from './'
import yearmonth from '/mocks/test-data/yearmonth.json'

const meta: Meta<typeof ArchivePerYear> = {
  component: ArchivePerYear,
}

export default meta
type Story = StoryObj<typeof ArchivePerYear>

export const Primary: Story = {
  args: {
    yearmonths: yearmonth.items
  }
}
