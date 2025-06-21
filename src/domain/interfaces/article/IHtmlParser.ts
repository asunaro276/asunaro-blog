import type { Heading } from "/domain/models/article/heading/Heading";

export type HtmlParser = {
  parseBody(html: string): Promise<string>
  parseHeadings(html: string): Heading[]
}
