import type { CategoryItem } from '/types'
import { BottomNavigationBar } from './BottomNavigationBar'
import { CopyRight } from './CopyRight'

type Props = {
  categories: CategoryItem[]
}

export const Footer = (props: Props) => {
  return (
    <div>
      <BottomNavigationBar categories={props.categories} />
      <CopyRight />
    </div>
  )
}
