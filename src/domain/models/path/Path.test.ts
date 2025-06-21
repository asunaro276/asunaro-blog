import { describe, expect, test } from "bun:test"
import { Path } from "./Path"
import { Page } from "../page/Page"

describe('Page', () => {
  describe('正常系', () => {
    test('有効な値を引数にするとvalueにハイフンつなぎの値をもつ', () => {
      expect(new Path('tag', '1234', new Page(3)).value).toBe('/tag/1234/3')
      expect(new Path('tag', '1234', new Page(1)).value).toBe('/tag/1234')
      expect(new Path('', '', new Page(3)).value).toBe('/3')
      expect(new Path('', '', new Page(1)).value).toBe('/')
    })

    test('同一のvalueを持つPathは同一とみなす', () => {
      const path1 = new Path('tag', '1234', new Page(3))
      const path2 = new Path('tag', '1234', new Page(3))
      const path3 = new Path('category', '1234', new Page(5))
      expect(path1.equals(path2)).toBeTruthy()
      expect(path1.equals(path3)).toBeFalsy()
    })

    test('nextPageで次のページを取れる', () => {
      expect(new Path('category', '1234', new Page(5)).nextPage.equals(new Path('category', '1234', new Page(6)))).toBeTruthy()
    })
  })

  describe('異常系', () => {
    test('不正な値を引数にするとエラーを投げる', () => {
      expect(() => new Path('', '1234', new Page(3))).toThrow(`全記事一覧にIDは指定できません`)
      expect(() => new Path('tag', '', new Page(3))).toThrow(`パス（tag）にはIDを指定する必要があります`)
    })
  })
})
