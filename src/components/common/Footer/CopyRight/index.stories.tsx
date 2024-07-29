import type { Meta, StoryObj } from '@storybook/react'

import { CopyRight } from './'

const meta: Meta<typeof CopyRight> = {
  component: CopyRight,
}

export default meta
type Story = StoryObj<typeof CopyRight>

export const Primary: Story = {
  render: () => <CopyRight />,
}
