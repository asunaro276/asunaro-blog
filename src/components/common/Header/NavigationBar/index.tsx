import * as React from 'react'
import { pageIcons } from '/constants'
import type { CategoryItem } from '/types'

type Props = {
  logo: string
  categories: CategoryItem[]
}

export const NavigationBar = (props: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const categories = [
    {
      _id: '',
      _sys: {
        raw: {
          createdAt: '',
          updatedAt: '',
          firstPublishedAt: '',
          publishedAt: '',
        },
        customOrder: 0,
        createdAt: '',
        updatedAt: '',
      },
      displayedName: 'HOME',
      name: 'home',
    },
    ...props.categories,
  ]
  return (
    <header className='bg-slate-500 pt-[16px] pb-[12px]'>
      <div>
        <div>
          <button
            className='md:hidden'
            onClick={handleOpenNavMenu}
          >
            <span className='material-icons'>menu</span>
          </button>
        </div>
        <p className='md:hidden'>
          <a href='/' rel='noopener noreferrer'>
            {props.logo}
          </a>
        </p>
        <div className='hidden md:block'>
          <div className='flex gap-10'>
            {categories.map((category, index) => (
              <div>
                <a
                  href={category._id ? `/category/${category._id}` : '/'} 
                  onClick={handleCloseNavMenu}
                  className='flex text-lg duration-100 ease-out text-white hover:bg-slate-400'
                  rel='noopener noreferrer'
                >
                  <div className='mt-[1.5px] mr-1'>{pageIcons[index]}</div>
                  <div className=''>{category.displayedName}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
