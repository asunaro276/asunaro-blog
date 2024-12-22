import { describe, expect, test } from "bun:test"
import { Page } from "./Page"

describe('Page', () => {
  describe('正常系', () => {
    test('有効な値を引数にするとvalueにページ数の文字列が入る', () => {
      expect(new Page(10).value).toBe(10)
      expect(new Page(3).value).toBe(3)
      expect(new Page(1).value).toBe(1)
    })

    test('有効な値を引数にするとstrにページ数の文字列が入り、1ページ目のときは空文字列が入る', () => {
      expect(new Page(10).str).toBe('10')
      expect(new Page(3).str).toBe('3')
      expect(new Page(1).str).toBe('')
    })

    test('同一のyearとmonthを持つPageは同一とみなす', () => {
      const page1 = new Page(4)
      const page2 = new Page(4)
      const page3 = new Page(5)
      expect(page1.equals(page2)).toBeTruthy()
      expect(page1.equals(page3)).toBeFalsy()
    })

    test('nextで次のページを取れる', () => {
      expect(new Page(10).next.equals(new Page(11))).toBeTruthy()
    })

    test('prevで前のページが取れる', () => {
      expect(new Page(10).prev.equals(new Page(9))).toBeTruthy()
    })

    test('hasPrevはページが1より大きい時true, 1より小さい時falseを返す', () => {
      expect(new Page(3).hasPrev()).toBeTruthy()
      expect(new Page(1).hasPrev()).toBeFalsy()
    })
  })

  describe('異常系', () => {
    test('不正な値を引数にするとエラーを投げる', () => {
      expect(() => new Page(5.4)).toThrow(`ページ番号が自然数ではありません`)
      expect(() => new Page(-1)).toThrow(`ページ番号が自然数ではありません`)
    })
  })
})
