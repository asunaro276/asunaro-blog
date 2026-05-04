## 1. Favicon 差し替え（候補C）

- [x] 1.1 `public/favicons/favicon.svg` を候補C「ヒノキの枝シルエット」SVG で作成する（ライトモード背景 `#f4f3ef`・ダークモード対応 `@media prefers-color-scheme: dark`）
- [x] 1.2 SVG から PNG を生成し `favicon-16x16.png`・`favicon-32x32.png`・`apple-touch-icon.png`・`android-chrome-192x192.png`・`android-chrome-384x384.png`・`mstile-150x150.png` を上書きする
- [x] 1.3 `public/favicons/safari-pinned-tab.svg` を候補C の単色マスク用 SVG（fill="#2f6b3f"）で上書きする
- [x] 1.4 `public/favicons/favicon.ico` を 16px・32px を含む ICO で上書きする
- [x] 1.5 `src/presentation/layouts/Layout.astro` に `<link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg">` を追加する

## 2. フォント修正

- [x] 2.1 `src/presentation/styles/globals.scss` の `.font-serif-jp` を `'Inter', 'Noto Sans JP', sans-serif` に変更し、`letter-spacing: -0.025em` を追加する
- [x] 2.2 `src/presentation/layouts/Layout.astro` の Google Fonts リンクに `Instrument+Serif` が含まれていないことを確認する（不要なら削除）

## 3. タグ一覧ページ 専用ヘッダー

- [x] 3.1 `src/presentation/components/common/TagHeader/index.astro` を新規作成する（props: `tag: Tag, tags: Tag[], totalCount: number`）
- [x] 3.2 TagHeader に：パンくず（← TAGS / Tag）・`#TagName` 大見出し・記事数・Related tags チップ一覧を実装する
- [x] 3.3 `src/presentation/components/HomePage/index.astro` で `tag` props がある場合に `TagHeader` を表示し、既存のシンプルなテキスト表示を削除する

## 4. 月別アーカイブページ 専用ヘッダー + 記事リスト

- [x] 4.1 `src/presentation/components/common/YearMonthHeader/index.astro` を新規作成する（props: `yearmonth: YearMonth, yearmonths: YearMonth[], totalCount: number`）
- [x] 4.2 YearMonthHeader に：パンくず（← ARCHIVE / Monthly）・年・月名大見出し・記事件数・前後月ナビ・年ストリップ（12ヶ月チップ）を実装する
- [x] 4.3 `src/presentation/components/common/YearMonthArticleList/index.astro` を新規作成する（props: `articles: Article[]`）
- [x] 4.4 YearMonthArticleList にタイムライン形式（日付レール + 記事サムネイル + テキスト情報）を実装する
- [x] 4.5 `src/presentation/components/HomePage/index.astro` で `yearmonth` props がある場合に `YearMonthHeader` と `YearMonthArticleList` を使用し、既存のシンプルなテキスト表示を削除する

## 5. ToC 階層表示（Variant A）

- [x] 5.1 `src/presentation/components/PostPage/PostBody/TableOfContents/index.tsx` で `item.htmlTag`（"h2"/"h3"/"h4"）から level を導出する
- [x] 5.2 level に応じたインデント（`(level-2)*14px`）・フォントサイズ（h2=13px, h3=12px, h4=11.5px）・フォントウェイト（h2=500, h3/h4=400）を適用する
- [x] 5.3 非アクティブな h2 を `--fg-2`、h3/h4 を `--fg-3` で表示し、アクティブは全レベル `--fg` で表示する
