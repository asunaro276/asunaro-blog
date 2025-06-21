import type { URL } from "url"

export class CoverImage {
  constructor(
    readonly title: string,
    readonly altText: string,
    readonly description: string,
    readonly fileName: string,
    readonly height: number,
    readonly width: number,
    readonly src: URL,
  ) {}
}
