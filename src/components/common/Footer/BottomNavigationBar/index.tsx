import { Box, Divider, Link as MuiLink } from '@mui/material'
import type { CategoryItem } from '/types'

type Props = {
  categories: CategoryItem[]
}

export const BottomNavigationBar = (props: Props) => {
  return (
    <Box className='bg-slate-500' sx={{ height: { xs: '50', sm: '50' } }}>
      <Box className='flex justify-center pt-5' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        {props.categories.map((category, index) => {
          return (
            <Box key={index}>
              <div className='mx-4 my-6 text-white md:mx-6'>
                <MuiLink
                  href={`/category/${category._id}`} 
                  color='inherit'
                  underline='hover'
                  className='hover:text-slate-200'
                  rel='noopener noreferrer'
                >
                  {category.displayedName}
                </MuiLink>
              </div>
              {index < props.categories.length - 1 && (
                <Divider
                  variant='fullWidth'
                  light
                  sx={{
                    display: {
                      xs: 'block',
                      sm: 'none',
                      borderTop: '1px dashed',
                      borderBottom: '0',
                    },
                    borderColor: 'white',
                  }}
                />
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
