import { Box, Container, Grid, Typography } from '@mui/material'
import { Header } from 'components/common/Header'
import type { ArticleItem, CategoryItem, TagItem, YearMonthItem } from '/types'
import Pagination from './Pagination'
import PostsList from './PostsList'
import { Footer } from 'components/common/Footer'
import { SideBar } from 'components/common/SideBar'

type Props = {
  pageNumber: number
  blogs: ArticleItem[]
  categories: CategoryItem[]
  tags: TagItem[]
  yearmonths: YearMonthItem[]
  totalCount: number
  category?: CategoryItem
  tag?: TagItem
  yearmonth?: string
  statusCode?: number
}

export const HomePage = (props: Props) => {
  const dir = (() => {
    if (props.tag) {
      return `tag/${props.tag._id}`
    } else if (props.category) {
      return `category/${props.category._id}`
    } else if (props.yearmonth) {
      return `year/${props.yearmonth}`
    } else {
      return ''
    }
  })()
  return (
    <Box className='bg-slate-100'>
      <Box>
        <Header categories={props.categories} />
      </Box>
      <Container maxWidth='lg' sx={{ paddingY: '2rem' }}>
        <Grid container columnSpacing={4} rowSpacing={6}>
          <Grid container item md={9}>
            <Grid item xs={12}>
              {props.tag && (
                <Box className='my-12 text-center'>
                  {props.blogs.length === 0 ? (
                    <Typography className=''>該当するタグの記事はありません</Typography>
                  ) : (
                    <Typography>{props.tag.tag}に関する記事一覧</Typography>
                  )}
                </Box>
              )}
              {props.category && (
                <Box className='my-12 text-center'>
                  {props.blogs.length === 0 ? (
                    <Typography className=''>該当するカテゴリーの記事はありません</Typography>
                  ) : (
                    <Typography>
                      {props.blogs[0].category.displayedName}カテゴリの記事一覧
                    </Typography>
                  )}
                </Box>
              )}
              {props.yearmonth && (
                <Box className='my-12 text-center'>
                  {props.blogs.length === 0 ? (
                    <Typography className=''>該当する期間の記事はありません</Typography>
                  ) : (
                    <Typography>{props.yearmonth}の記事一覧</Typography>
                  )}
                </Box>
              )}
              {props.statusCode && (
                <Box>Error{props.statusCode}</Box>
              )}
              {!props.statusCode &&
                <PostsList blogs={props.blogs} />
              }
              {!props.statusCode && (
                <Grid item container md={12} justifyContent='center' sx={{ marginTop: '50px' }}>
                  <Pagination dir={dir} pageNumber={props.pageNumber} totalCount={props.totalCount} />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <SideBar yearmonths={props.yearmonths} tags={props.tags} />
          </Grid>
        </Grid>
      </Container>
      <div>
        <Footer categories={props.categories} />
      </div>
    </Box>
  )
}
