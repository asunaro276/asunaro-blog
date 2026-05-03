## Why

デザインプロトタイプ（`asunaroblog (1).zip`）が完成し、Favion・フォント・タグ一覧ページ・月別アーカイブページ・記事ToC の5点について、プロトタイプと実装の乖離を解消するため。リブランドのUIが「森の緑（forest green）」テーマで統一されているが、これらの箇所だけ旧デザインのままになっている。

## What Changes

- **Favicon 差し替え（候補C採用）**: 既存のファビコン一式（PNG + ICO + SVG）を、プロトタイプで候補Cとして定義された「ヒノキの枝シルエット」に置き換える
- **タイトル・見出しフォント修正**: `font-serif-jp` クラスの定義を `Noto Serif JP` から `Inter / Noto Sans JP` に変更し、デザインの `data-headline="sans"` デフォルトに合わせる
- **タグ一覧ページ リデザイン**: タグ名・記事数・関連タグチップ・パンくずを含む専用ヘッダーを新設し、`VTag` コンポーネントのデザインを実装する
- **月別アーカイブページ リデザイン**: 年・月名の大きな見出し・月チップ付き年ストリップ・前後月ナビ・タイムライン形式の記事リストを含む専用ヘッダーを新設し、`VMonth` コンポーネントのデザインを実装する
- **ToC 候補A 採用**: 現行のフラットなToC をインデント+サイズ+左ボーダー方式（Variant A "Indent"）に更新し、h2/h3/h4 の階層を視覚化する

## Capabilities

### New Capabilities
- `tag-header`: タグ一覧ページ専用のヘッダーセクション（タグ名・記事数・パンくず・関連タグチップ）
- `yearmonth-header`: 月別アーカイブページ専用のヘッダーセクション（年月見出し・前後ナビ・年ストリップ）
- `yearmonth-article-list`: 月別アーカイブページのタイムライン形式記事リスト

### Modified Capabilities
- `archive-heatmap`: 月別アーカイブページに移動するため sidebar から独立した表示要件が変わる（ただし sidebar は維持）
- `post-layout`: ToC に階層表示（h2/h3/h4 インデント・サイズ・左ボーダー）が追加される

## Impact

- `public/favicons/`: favicon PNG・ICO・SVG ファイルの全差し替え
- `src/presentation/styles/globals.scss`: `font-serif-jp` クラスのフォントスタック変更
- `src/presentation/layouts/Layout.astro`: Google Fonts 読み込みへの `Noto+Serif+JP` 維持確認（ToC向けに `Instrument+Serif` は不要）
- `src/presentation/components/common/CategoryHeader/index.astro`: タグ専用・月専用ヘッダーへの分岐または新規コンポーネント化
- `src/presentation/components/HomePage/index.astro`: tag / yearmonth 向け表示の切り替えロジック更新
- `src/presentation/components/PostPage/PostBody/TableOfContents/index.tsx`: 階層インデント対応
- `src/domain/models/article/heading/Heading.ts`: ToC の `level` フィールド参照（既存確認）
