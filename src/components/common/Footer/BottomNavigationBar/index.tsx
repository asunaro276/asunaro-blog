import type { CategoryItem } from '/types'

type Props = {
  categories: CategoryItem[]
}

export const BottomNavigationBar = (props: Props) => {
  return (
    <div className='bg-slate-500'>
      <div className='flex justify-center pt-5'>
        {props.categories.map((category, index) => {
          return (
            <div>
              <div className='mx-4 my-6 text-white md:mx-6'>
                <a
                  href={`/category/${category._id}`} 
                  className='hover:text-slate-200'
                  rel='noopener noreferrer'
                >
                  {category.displayedName}
                </a>
              </div>
              {index < props.categories.length - 1 && (
                <hr />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
