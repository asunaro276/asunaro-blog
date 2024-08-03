import { http, HttpResponse } from 'msw'
import indexData from './test-data/index.json'
import categoryData from './test-data/category.json'
import tagData from './test-data/tag.json'
import yearmonthData from './test-data/yearmonth.json'
import blogData from './test-data/blog/index'
import type { ArticleItem, ArticleResponse, CategoryResponse, TagResponse, YearMonthResponse } from '/types'

const baseUrl = `https://${process.env.NEWT_SPACE_UID}.cdn.newt.so/v1`

export const handlers = [
  http.get(`${baseUrl}/asunaroblog/article`, ({}) => {
    return HttpResponse.json<ArticleResponse>(indexData, { status: 200 })
  }),
  http.get(`${baseUrl}/asunaroblog/article/:ArticleId`, ({ params }) => {
    const articleId = params.ArticleId as string
    const num = parseInt(articleId)
    const resData = blogData[num % 2]
    return HttpResponse.json<ArticleItem>(resData, { status: 200 })
  }),
  http.get(`${baseUrl}/asunaroblog/tag`, () => {
    return HttpResponse.json<TagResponse>(tagData, { status: 200 })
  }),
  http.get(`${baseUrl}/asunaroblog/yearmonth`, () => {
    return HttpResponse.json<YearMonthResponse>(yearmonthData, { status: 200 })
  }),
  http.get(`${baseUrl}/asunaroblog/category`, () => {
    return HttpResponse.json<CategoryResponse>(categoryData, { status: 200 })
  }),
  http.get(`https://amzn.to/*`, () => {
    return HttpResponse.text()
  }),
  http.get(`https://qiita.com/*`, () => {
    return HttpResponse.text()
  }),
]
