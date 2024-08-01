import { Card, CardContent, Button, Box } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import type { TagItem } from '/types'

type Props = {
  tags: TagItem[]
}

export const SideTags = (props: Props) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ paddingBottom: '1.5em', fontWeight: 600 }}>Tag</CardContent>
      <CardContent sx={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', height: '70%' }}>
        {props.tags.map((tag) => {
          return (
            <Box sx={{ marginTop: '1rem' }} key={tag._id}>
              <a href={`/tag/${tag._id}`}>
                <Button
                  variant='contained'
                  size='small'
                  className='mr-4 text-xs'
                  sx={{ textTransform: 'none', display: 'flex' }}
                >
                  <LocalOfferIcon fontSize='small' className='mr-0.5' />
                  {tag.tag}
                  <span>（{tag.ref?.length ?? 0}）</span>
                </Button>
              </a>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}
