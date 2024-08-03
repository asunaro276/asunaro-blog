import type { CategoryItem } from '/types'
import { NavigationBar } from './NavigationBar'

type Props = {
  categories: CategoryItem[]
}

export const Header = (props: Props) => {
  const logo = 'ASUNAROBLOG'
  return (
    <div>
      <div className='flex justify-center'>
        <p
          className='py-4 font-logo hidden md:block'
          style={{
            maxWidth: '1300px',
            flexGrow: 1,
          }}
        >
          <a href='/' className='text-slate-700 no-underline' style={{ fontSize: '40px' }}>
            {logo}
          </a>
        </p>
      </div>
      <NavigationBar logo={logo} categories={props.categories} />
    </div>
  )
}
