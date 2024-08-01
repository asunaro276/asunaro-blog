import type { ArticleItem } from '/types'
import { Grid } from '@mui/material'
import PostCard from './PostCard'

type Props = {
  blogs: ArticleItem[]
}

const PostsList = (props: Props) => {
  return (
    <Grid container spacing={3}>
      {props.blogs.map((post, index) => {
        return (
          <Grid item xs={12} sm={6} key={index}>
            <PostCard blog={post} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PostsList
