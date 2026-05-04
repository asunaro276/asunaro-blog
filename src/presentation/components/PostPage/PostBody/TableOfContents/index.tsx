import { useState, useEffect } from 'react'
import type { Heading } from '/domain/models/article/heading/Heading'

type Props = {
  tableOfContents: Heading[]
}

export const TableOfContents = ({ tableOfContents }: Props) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!tableOfContents || tableOfContents.length === 0) return

    const HEADER_OFFSET = 80

    const handleScroll = () => {
      const headings = tableOfContents
        .map(h => ({ id: h.attribsId, el: document.getElementById(h.attribsId) }))
        .filter((h): h is { id: string; el: HTMLElement } => h.el !== null)

      if (headings.length === 0) return

      const scrollTop = window.scrollY + HEADER_OFFSET + 1

      // スクロール位置を超えた最後の見出しをアクティブにする
      let currentId = headings[0].id
      for (const { id, el } of headings) {
        if (el.getBoundingClientRect().top + window.scrollY <= scrollTop) {
          currentId = id
        }
      }
      setActiveId(currentId)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tableOfContents])

  if (!tableOfContents || tableOfContents.length === 0) return null

  const rawLevels = tableOfContents.map(item => parseInt(item.htmlTag.replace('h', '')) || 2)
  const minLevel = Math.min(...rawLevels)

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--fg-3)', marginBottom: 14 }}>
        Contents
      </div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {tableOfContents.map((item, i) => {
          const isActive = item.attribsId === activeId
          const rawLevel = parseInt(item.htmlTag.replace('h', '')) || 2
          const level = 2 + (rawLevel - minLevel)
          const indent = (level - 2) * 14
          const fontSize = level === 2 ? 13 : level === 3 ? 12 : 11.5
          const fontWeight = level === 2 ? 500 : 400
          const inactiveColor = level === 2 ? 'var(--fg-2)' : 'var(--fg-3)'
          return (
            <li
              key={i}
              style={{
                paddingTop: 7,
                paddingBottom: 7,
                paddingRight: 0,
                paddingLeft: 12 + indent,
                borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                fontSize,
                color: isActive ? 'var(--fg)' : inactiveColor,
                fontWeight,
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              <a
                href={`#${item.attribsId}`}
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default TableOfContents
