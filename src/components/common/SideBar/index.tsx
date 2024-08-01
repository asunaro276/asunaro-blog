import { Box } from '@mui/material'
import type { Heading, TagItem, YearMonthItem } from '/types'
import { SideToc } from './SideToc'
import ArchivePerYear from './ArchivePerYear'
import { SideProfile } from './SideProfile'
import { SideTags } from './SideTags'

type Props = {
  headings?: Heading[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
}

export const SideBar = (props: Props) => {
  return (
    <Box className='SideBar-Wrapper' sx={{ height: 'calc(100% - 2.5rem)' }}>
      <Box>
        <Box className='mb-8'>
          <SideProfile />
        </Box>
        <Box className='mb-8' sx={{ height: '400px' }}>
          <SideTags tags={props.tags} />
        </Box>
        <Box className='mb-8'>
          <ArchivePerYear yearmonths={props.yearmonths} />
        </Box>
      </Box>
      {props.headings !== undefined && (
        <Box className='sticky top-4 box-border' sx={{ display: { xs: 'none', md: 'block' } }}>
          <SideToc headings={props.headings} />
        </Box>
      )}
    </Box>
  )
}
