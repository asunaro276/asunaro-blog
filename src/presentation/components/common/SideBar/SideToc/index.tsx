import { Link as Scroll } from 'react-scroll'
import type { Heading } from '/domain/models/article/heading/Heading'

type Props = {
  tableOfContents: Heading[]
}

export const SideToc = (props: Props) => {
  var tocCount = [1, 1, 1]
  return (
    <div className="shodow border bg-white rounded pb-12 p-6">
      <p className='mt-10 text-center'>目次</p>
      <div className='flex items-center justify-center'>
        <ul className='mb-10 w-8/12'>
          {props.tableOfContents.map((data, index) => {
            if (data.text === undefined) {
              return <div key={index}></div>
            }
            if (data.htmlTag === 'h1') {
              tocCount[0] += 1
              return (
                <li className='mt-4 list-none' key={index}>
                  <Scroll
                    to={`${data.attribsId}`}
                    smooth={true}
                    className='relative flex cursor-pointer hover:opacity-50 transition-opacity'
                    id={`l${index}`}
                    duration={400}
                  >
                    <div className='absolute -left-10 flex aspect-square w-10 items-center justify-center rounded-full border border-solid border-slate-400 bg-slate-200 '>
                      <p className='font-body text-lg'>
                        {(tocCount[0] - 1).toString()}
                      </p>
                    </div>
                    <div className='ml-2 mt-2'>{data.text}</div>
                  </Scroll>
                </li>
              )
            }
            if (data.htmlTag === 'h2' && tocCount[0] === 1) {
              tocCount[1] += 1
              return (
                <li className='my-2 list-none' key={index}>
                  <Scroll
                    to={`${data.attribsId}`}
                    smooth={true}
                    className='flex cursor-pointer hover:opacity-50'
                    id={`${index}`}
                    duration={400}
                  >
                    <div className='text-md ml-5 mr-5'>{`${tocCount[1] - 1}`}</div>
                    <div className='ml-2'>{data.text}</div>
                  </Scroll>
                </li>
              )
            }
            // if (data.tag === "h3") {
            //   tocCount[2] += 1
            //   return (
            //     <li key={data.id} className="my-2">
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
