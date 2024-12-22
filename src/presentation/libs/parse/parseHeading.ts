import * as cheerio from 'cheerio'
import type { Heading } from '/types'

export const parseHeading = (html: string) => {
  const $ = cheerio.load(html)
  const headings = $('h1, h2').toArray()
  const toc: Heading[] = headings.map((data: any) => ({
    text: data.children[0].data,
    htmlTag: data.name,
    _id: data.attribs.id,
  }))
  return toc
}
