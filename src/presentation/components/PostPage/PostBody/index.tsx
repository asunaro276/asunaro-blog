import type { Heading } from '/types'
import Caption from './Caption'
import { TableOfContents } from './TableOfContents'
import { useEffect } from 'react'
import renderMathInElement from 'katex/contrib/auto-render'
import 'katex/dist/katex.min.css'
import { useCodeCopy } from '../../../hooks/useCodeCopy'
import type { Article } from '/domain/models/article/Article'

type Props = {
  article: Article
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
    <div className='shadow border bg-white px-12 md:px-20 flex flex-col items-center'>
      <div className='my-10'>
        <Caption
          title={props.article.title}
          publishedAt={props.article.publishedAt}
          tagsOfPost={props.article.tags}
          categoryOfPost={props.article.category}
          imageUrl={props.article.coverImage.src.toString()}
          imageAlt={
            props.article.coverImage.altText === undefined ? '' : props.article.coverImage.altText
          }
        />
      </div>
      <TableOfContents heading={props.headings} />
      <div className='mb-20 w-full'>
        <div dangerouslySetInnerHTML={{ __html: props.article.htmlBody }} />
      </div>
    </div>
  )
}

export default PostBody
