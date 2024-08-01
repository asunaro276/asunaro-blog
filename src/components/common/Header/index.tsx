import { Container, Link, Typography } from '@mui/material'
import type { CategoryItem } from '/types'
import { NavigationBar } from './NavigationBar'

type Props = {
  categories: CategoryItem[]
}

export const Header = (props: Props) => {
  const logo = 'ASUNAROBLOG'
  return (
    <div>
      <Container>
        <Typography
          className='py-5 font-logo'
          sx={{
            maxWidth: '1300px',
            flexGrow: 1,
            display: { xs: 'none', md: 'block' },
            fontSize: { xs: 30, md: 40 },
          }}
        >
          <Link href='/' underline='none' className='text-slate-700'>
            {logo}
          </Link>
        </Typography>
      </Container>
      <NavigationBar logo={logo} categories={props.categories} />
    </div>
  )
}
