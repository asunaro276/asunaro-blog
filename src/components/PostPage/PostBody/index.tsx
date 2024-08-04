import type { ArticleItem, Heading } from '/types'
import Caption from './Caption'
import { TableOfContents } from './TableOfContents'
import { useEffect } from 'react'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'
import { useCodeCopy } from '/hooks/useCodeCopy'

type Props = {
  blog: ArticleItem
  headings: Heading[]
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
    <div className='my-10'>
      <div className='my-10'>
        <Caption
          title={props.blog.title}
          publishedAt={props.blog._sys.raw.firstPublishedAt}
          tagsOfPost={props.blog.tags}
          categoryOfPost={props.blog.category}
          imageUrl={props.blog.coverImage.src}
          imageAlt={
            props.blog.coverImage.altText === undefined ? '' : props.blog.coverImage.altText
          }
        />
      </div>
      <div>
        <TableOfContents heading={props.headings} />
      </div>
      <div>
        <div className='mb-20'>
          <div dangerouslySetInnerHTML={{ __html: props.blog.body }} />
        </div>
      </div>
    </div>
  )
}

export default PostBody
