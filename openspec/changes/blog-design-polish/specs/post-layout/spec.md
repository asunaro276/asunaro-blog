## MODIFIED Requirements

### Requirement: ToC 階層表示（Variant A: Indent）
記事詳細ページの目次（ToC）は、h2/h3/h4 の見出し階層をインデント・フォントサイズ・左ボーダーで視覚的に区別して表示する SHALL。

#### Scenario: ToC に階層が表示される
- **WHEN** h2/h3/h4 が混在する記事の詳細ページを表示する
- **THEN** h2 の目次項目は左インデント 0px・フォントサイズ 13px・font-weight 500 で表示される
- **THEN** h3 の目次項目は左インデント 14px・フォントサイズ 12px・font-weight 400 で表示される
- **THEN** h4 の目次項目は左インデント 28px・フォントサイズ 11.5px・font-weight 400 で表示される
- **THEN** アクティブな項目は `border-left: 2px solid var(--accent)` と `color: var(--fg)` で強調される
- **THEN** 非アクティブな h2 は `color: var(--fg-2)`、h3/h4 は `color: var(--fg-3)` で表示される
