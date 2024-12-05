import { Link as Scroll } from 'react-scroll'
import type { Heading } from '/types'

type Props = {
  heading: Heading[]
}

export const TableOfContents = (props: Props) => {
  let tocCount = [1, 1, 1]
  return (
    <div className='rounded border-solid border-slate-200 font-body border-2 w-full'>
      <div className='flex h-8 items-center justify-center bg-slate-200'>
        <span className='material-icons'>toc</span>
        <p>目次</p>
      </div>
      <div className='flex flex-col items-center justify-center py-9'>
        <ul className='pl-2 w-8/12'>
          {props.heading.map((data, index) => {
            if (data.text === undefined) {
              return <div key={index}></div>
            }
            if (data.htmlTag === 'h1') {
              tocCount[0] += 1
              tocCount[1] = 1
              return (
                <li key={index} className='my-4 ml-6 list-none'>
                  <Scroll
                    to={`${data._id}`}
                    smooth={true}
                    className='relative flex cursor-pointer hover:opacity-50 transition-opacity'
                    id={`l${index}`}
                    duration={400}
                  >
                    <div className='absolute -left-10 flex aspect-square w-8 items-center justify-center rounded-full border border-solid border-slate-400 bg-slate-200 sm:w-10 '>
                      {(tocCount[0] - 1).toString()}
                    </div>
                    <div className='ml-2 mt-2'>{data.text}</div>
                  </Scroll>
                </li>
              )
            }
            if (data.htmlTag === 'h2') {
              tocCount[1] += 1
              tocCount[2] = 1
              return (
                <li key={index} className='my-2 list-none'>
                  <Scroll
                    to={`${data._id}`}
                    smooth={true}
                    className='flex cursor-pointer hover:opacity-50'
                    id={`${index}`}
                    duration={400}
                  >
                    <div className='text-md sm:ml-5 sm:mr-5'>
                      {tocCount[0] > 1
                        ? `${tocCount[0] - 1}.${tocCount[1] - 1}`
                        : `${tocCount[1] - 1}`}
                    </div>
                    <div className='ml-2'>{data.text}</div>
                  </Scroll>
                </li>
              )
            }
            // if (data.tag === "h3") {
            //   tocCount[2] += 1
            //   return (
            //     <li key={index} className="my-2 list-none">
            //       <Scroll to={`${data.id}`} smooth={true} className="hover:opacity-50 cursor-pointer flex" id={`${index}`} duration={400}>
            //         <Box className="ml-10 mr-5 text-md">
            //           {`${(tocCount[0] - 1)}.${tocCount[1] - 1}.${tocCount[2] - 1}`}
            //         </Box>
            //         <Box className="ml-2">
            //           {data.text}
            //         </Box>
            //       </Scroll>
            //     </li>
            //   )
            // }
          })}
        </ul>
      </div>
    </div>
  )
}
