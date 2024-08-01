import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, Link as MuiLink } from '@mui/material'
import { convertDateFormat } from '/libs/convertDateFormat'
import { LocalOffer } from '@mui/icons-material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import type { ArticleItem } from '/types'

type Props = {
  blog: ArticleItem
}

export default function PostCard(props: Props) {
  return (
    <Card
      className='duration-[1000ms] hover:brightness-[0.8]'
      sx={{ height: { xs: '30rem', lg: '32rem' }, display: 'flex', flexDirection: 'column' }}
    >
      <a href={`/blog/${props.blog._id}`}>
        <CardActionArea className='relative h-full'>
          <CardMedia
            component='img'
            height='200'
            image={props.blog.coverImage.src}
            alt={props.blog.coverImage.altText}
          />
          <CardContent className='mt-2 h-1/2 p-1'>
            <Typography gutterBottom component='div' className='mx-5' sx={{ fontSize: 20 }}>
              <Typography className='text-lg text-black'>{props.blog.title}</Typography>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
              >
                <Button
                  className='my-2 text-xs'
                  variant='outlined'
                  sx={{ textTransform: 'none', display: 'flex' }}
                  size='small'
                >
                  {props.blog.category.displayedName}
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {props.blog.tags.map((tag, index) => (
                    <Box sx={{ display: 'flex', marginRight: '0.5em' }} key={index}>
                      <LocalOffer sx={{ fontSize: '1.25rem', marginRight: '0.05rem' }} />
                      <Typography sx={{ display: 'inline-block' }}>{tag.tag}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Typography>
          </CardContent>
          <CardContent className='absolute bottom-2 flex p-1 pl-5 opacity-80'>
            <AccessTimeIcon fontSize='small' className='opacity-80' />
            <Typography color='text.secondary' sx={{ display: 'inline-block', marginLeft: '2px' }}>
              {convertDateFormat(props.blog._sys.raw.firstPublishedAt)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
    </Card>
  )
}
