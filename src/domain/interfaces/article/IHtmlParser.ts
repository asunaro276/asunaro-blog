import type { Heading } from "/domain/models/article/heading/Heading";

export interface IHtmlParser {
  parseHtml(html: string): string
  parseHeadings(html: string): Heading[]
}
