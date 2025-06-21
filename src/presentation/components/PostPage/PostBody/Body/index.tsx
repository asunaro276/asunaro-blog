import { useEffect } from 'react'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'
import { useCodeCopy } from '/presentation/hooks/useCodeCopy'

type Props = {
  htmlBody: string
}

const PostBody = (props: Props) => {
  useCodeCopy()
  useEffect(() => {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '[', right: ']', display: true },
      ],
      ignoredTags: ['code'],
      throwOnError: false,
      strict: false,
    })
  }, [])
  return (
    <div className='mb-20 w-full'>
      <div dangerouslySetInnerHTML={{ __html: props.htmlBody }} />
    </div>
  )
}

export default PostBody
