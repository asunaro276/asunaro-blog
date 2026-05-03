## 0. テスト基盤の整備

- [x] 0.1 `playwright.config.ts` に2つ目の `webServer` を追加し、デザインファイル（`openspec/changes/blog-redesign-forest-rebrand/design/`）を静的サーバー（port 4322）として起動する設定を追加する
  ```ts
  // 追加するwebServer設定
  { command: 'npx serve openspec/changes/blog-redesign-forest-rebrand/design -p 4322 --no-clipboard', url: 'http://localhost:4322', reuseExistingServer: !process.env.CI }
  ```
- [x] 0.2 `playwright.config.ts` にモバイルプロジェクト（Pixel 5 / iPhone 12）を追加する
- [x] 0.3 `e2e/helpers/design-reference.ts` を作成する（デザインHTMLの特定アートボードをスクリーンショット取得するユーティリティ）
  - `screenshotArtboard(page, slotId: 'home'|'post'|'category', theme: 'light'|'dark')` 関数
  - `http://localhost:4322/Rebrand.html` をロードし、テーマを設定後 `[data-dc-slot="${slotId}"] .dc-card` 要素をスクリーンショット
  - デザインキャンバスのロード完了を `page.waitForSelector('[data-dc-slot]')` で待機
- [x] 0.4 `e2e/helpers/theme.ts` を作成する（CSS custom properties 取得・テーマクラス検証ユーティリティ）
  - `getCssVar(page, varName)` 関数: `getComputedStyle(document.documentElement).getPropertyValue(varName)` を返す
  - `getThemeClass(page)` 関数: `<html>` 要素のテーマクラスを返す
- [x] 0.5 `e2e/fixtures/design-tokens.ts` を作成する（デザイン案の色・フォント・レイアウト値を定数として定義する）
  ```ts
  // variantFinal.jsx / Rebrand.html から抽出した参照値
  export const LIGHT = { accent: 'oklch(0.46 0.09 155)', bg: 'oklch(0.985 0.008 110)', fg: 'oklch(0.28 0.020 145)' };
  export const DARK  = { accent: 'oklch(0.78 0.10 145)', bg: 'oklch(0.17 0.012 150)' };
  export const FONTS = { serifJp: 'Noto Serif JP', mono: 'JetBrains Mono' };
  export const SIZES = { heroTitle: 52, postTitle: 48, categoryTitle: 56 }; // variantFinal.jsx L61/L309/L385
  ```

## 1. テーマシステム（TDD）

- [x] 1.1 **[テスト作成]** `e2e/theme-system.spec.ts` を作成する
  - Light テーマ時に `getCssVar(page, '--accent')` が `oklch(0.46 0.09 155)` を返すことを検証
  - Dark テーマ時に `getCssVar(page, '--accent')` が `oklch(0.78 0.10 145)` を返すことを検証
  - `page.emulateMedia({ colorScheme: 'dark' })` でロード時に `<html>` に `theme-dark` クラスが付与されることを検証
  - テーマトグルボタンをクリック後に `<html>` クラスが `theme-dark` に変わることを検証
  - テーマ切替後に `page.evaluate(() => localStorage.getItem('theme'))` が `'dark'` を返すことを検証
  - ページリロード後もテーマが保持されることを検証
- [x] 1.2 **[RED確認]** `bun run test:integration -- e2e/theme-system.spec.ts` を実行してテストが失敗することを確認する
- [x] 1.3 `globals.scss` に oklch ベースの CSS custom properties を Light/Dark 両テーマ分定義する（`--bg`, `--bg-2`, `--bg-3`, `--fg`, `--fg-2`, `--fg-3`, `--rule`, `--rule-2`, `--accent`, `--tint`）
- [x] 1.4 `tailwind.config.mjs` を CSS vars 参照に更新する
- [x] 1.5 `globals.scss` に `.font-sans-jp`, `.font-serif-jp`, `.font-mono` クラスを定義する
- [x] 1.6 `Layout.astro` の Google Fonts リンクを Inter・Noto Sans JP・Noto Serif JP・JetBrains Mono に変更する
- [x] 1.7 `Layout.astro` にテーマ初期化インラインスクリプトを追加する（`prefers-color-scheme` → `localStorage` → `<html>` クラス）
- [x] 1.8 ヘッダーにテーマトグルボタンを追加する
- [x] 1.9 **[GREEN確認]** `bun run test:integration -- e2e/theme-system.spec.ts` を実行してテストが全て通ることを確認する

## 2. サイトヘッダー（TDD）

- [x] 2.1 **[テスト作成]** `e2e/site-header.spec.ts` を作成する
  - ヘッダーの `position` が `sticky`、`top` が `0px` であることを検証
  - ヘッダーに `backdrop-filter` が `blur(14px)` を含むことを検証
  - ロゴ内に "asunaro" テキストと "blog" テキストが存在し、"blog" が `--accent` 色であることを検証（`variantFinal.jsx` L24-25）
  - "since 2022" テキストに `JetBrains Mono` フォントが適用されていることを検証（`variantFinal.jsx` L26）
  - HOME / CODE / BUSINESS / MATH / OTHER の5ナビ項目が存在することを検証（`data.jsx` NAV 定義）
  - CODE カテゴリページで CODE ナビ項目が `border-bottom` に `--accent` 色を持つことを検証（`variantFinal.jsx` L32-35）
  - SEARCH・RSS テキストがヘッダー右側に存在することを検証（`variantFinal.jsx` L40-41）
  - スクロール後もヘッダーが `getBoundingClientRect().top === 0` であることを検証
  - **[デザイン比較]** `screenshotArtboard(designPage, 'home', 'light')` の上部とアプリのヘッダースクリーンショットを `test-results/compare/` に保存する
- [x] 2.2 **[RED確認]** `bun run test:integration -- e2e/site-header.spec.ts` を実行してテストが失敗することを確認する
- [x] 2.3 `Header/index.astro` を新デザインに全面書き換える（sticky + blur backdrop + `grid-template-columns: 1fr auto 1fr`）
- [x] 2.4 ロゴを "asunaro**blog**"（accent 色）テキスト + "since 2022" モノスペーステキストに変更する
- [x] 2.5 ナビゲーションにアクティブ判定ロジックを追加し、現在ページ項目を accent ボーダーボトムで強調する
- [x] 2.6 ヘッダー右側に SEARCH・RSS ↗ ラベルを追加する
- [x] 2.7 **[GREEN確認]** `bun run test:integration -- e2e/site-header.spec.ts` を実行してテストが全て通ることを確認する

## 3. ヒーローセクション（TDD）

- [x] 3.1 **[テスト作成]** `e2e/hero-section.spec.ts` を作成する
  - トップページに `data-testid="hero-section"` 要素が存在することを検証
  - "FEATURED" テキストの `color` が `--accent` 値であることを検証（`variantFinal.jsx` L57）
  - ヒーロータイトルの `font-size` が `52px` であることを検証（`variantFinal.jsx` L61）
  - ヒーロータイトルに `Noto Serif JP` フォントが適用されていることを検証
  - タグチップの `border-radius` が `99px` であることを検証（`variantFinal.jsx` L64）
  - 「本文を読む →」テキストが存在しリンクであることを検証（`variantFinal.jsx` L67）
  - ヒーロー内の画像エリアの `aspect-ratio` が `3/2` であることを検証（`variantFinal.jsx` L70）
  - モバイル（375px幅）でヒーローが縦積みになることを検証
  - **[デザイン比較]** デザイン参照のヒーロー部分とアプリのスクリーンショットを `test-results/compare/` に保存する
- [x] 3.2 **[RED確認]** `bun run test:integration -- e2e/hero-section.spec.ts` を実行してテストが失敗することを確認する
- [x] 3.3 `HeroSection/index.astro` を新規作成する（FEATURED ラベル・カテゴリ・日付・見出し 52px serif・説明文・タグチップ・「本文を読む →」・カバー画像 3/2）
- [x] 3.4 `HomePage/index.astro` を更新し `POSTS[0]` を `HeroSection` に、`POSTS.slice(1)` を 3カラムグリッドに渡す
- [x] 3.5 **[GREEN確認]** `bun run test:integration -- e2e/hero-section.spec.ts` を実行してテストが全て通ることを確認する

## 4. 記事カード（TDD）

- [x] 4.1 **[テスト作成]** `e2e/article-card.spec.ts` を作成する
  - カードの画像エリアの `aspect-ratio` が `4/3` であることを検証（`variantFinal.jsx` L81）
  - カテゴリラベルの `letter-spacing` が `0.18em`、`text-transform` が `uppercase` であることを検証（`Rebrand.html` L40）
  - 日付テキストに `JetBrains Mono` フォントが適用されていることを検証（`variantFinal.jsx` L84）
  - 見出しの `font-family` が `Noto Serif JP`、`font-weight` が `600` であることを検証（`variantFinal.jsx` L86）
  - タグが `#タグ名` 形式で表示されることを検証（`variantFinal.jsx` L88-90）
  - カードにホバーすると `transform` に `translateY(-2px)` が適用されることを検証
  - トップページの記事グリッドが `grid-template-columns` で3カラムであることを検証（`variantFinal.jsx` L287）
  - **[デザイン比較]** デザイン参照のカードグリッド部分とアプリのスクリーンショットを保存する
- [x] 4.2 **[RED確認]** `bun run test:integration -- e2e/article-card.spec.ts` を実行してテストが失敗することを確認する
- [x] 4.3 `PostCard/index.astro` を新デザインに書き換える（カバー画像 4/3・カテゴリ label・日付 mono・見出し serif 18px・説明・タグ）
- [x] 4.4 `PostCard` に CSS transition によるホバーインタラクション（`translateY(-2px)` + box-shadow）を追加する
- [x] 4.5 `PostsList/index.astro` のグリッドを `grid-cols-3` に変更する
- [x] 4.6 **[GREEN確認]** `bun run test:integration -- e2e/article-card.spec.ts` を実行してテストが全て通ることを確認する

## 5. サイドバー（TDD）

- [x] 5.1 **[テスト作成]** `e2e/sidebar.spec.ts` を作成する
  - "About" ラベルテキストが存在することを検証
  - アバター要素の `border-radius` が `9999px` 相当で幅が `88px` であることを検証（`variantFinal.jsx` L152）
  - 名前テキストの `font-family` が `Noto Serif JP`、`font-size` が `20px` であることを検証（`variantFinal.jsx` L153）
  - "GITHUB ↗" と "X ↗" リンクが存在することを検証（`variantFinal.jsx` L156-157）
  - "Tags" ラベルが存在することを検証
  - タグチップに `border: 1px solid` スタイルと `border-radius: 99px` が適用されていることを検証（`variantFinal.jsx` L164）
  - タグチップ内に記事数が `JetBrains Mono` フォントで表示されることを検証（`variantFinal.jsx` L165）
  - "Archive" ラベルと "by month" テキストが存在することを検証（`variantFinal.jsx` L171-172）
  - 各年のヒートマップに12個のセルが存在することを検証（`variantFinal.jsx` L117）
  - 投稿のある月のセルに `color-mix` を含む `background` が設定されていることを検証（`variantFinal.jsx` L127）
  - 投稿のある月のセルをクリックすると `/yearmonth/` パスに遷移することを検証
  - 凡例の4段階カラーチップが表示されることを検証（`variantFinal.jsx` L181-188）
  - **[デザイン比較]** デザイン参照のサイドバー部分とアプリのスクリーンショットを保存する
- [x] 5.2 **[RED確認]** `bun run test:integration -- e2e/sidebar.spec.ts` を実行してテストが失敗することを確認する
- [x] 5.3 `SideProfile/index.astro` を新デザインに書き換える（About ラベル・円形アバター 88px・名前 serif 20px・自己紹介・GitHub/X リンク）
- [x] 5.4 `SideTags/index.astro` のタグを `--rule-2` ボーダーのチップスタイルに変更する
- [x] 5.5 `ArchiveHeatmap/index.tsx` を新規作成する（年×月グリッド・`color-mix` による色密度・月クリックで遷移）
- [x] 5.6 `ArchiveHeatmap` に「少〜多」凡例（4段階カラーチップ）を追加する
- [x] 5.7 `SideBar/index.astro` で `ArchivePerYear` を `ArchiveHeatmap client:load` に差し替える
- [x] 5.8 サイドバーに `border-left: 1px solid var(--rule)` と `padding-left: 36px` を追加する
- [x] 5.9 **[GREEN確認]** `bun run test:integration -- e2e/sidebar.spec.ts` を実行してテストが全て通ることを確認する

## 6. 記事詳細レイアウト（TDD）

- [x] 6.1 **[テスト作成]** `e2e/post-layout.spec.ts` を作成する
  - 記事詳細ページの本文エリアが `display: grid` でカラム数が3であることを検証（`variantFinal.jsx` L313）
  - 左カラムの `position` が `sticky`、`top` が `80px` であることを検証（`variantFinal.jsx` L315）
  - 記事タイトルの `font-size` が `48px`、`text-align` が `center` であることを検証（`variantFinal.jsx` L307-309）
  - カテゴリ・日付ラベルの `color` が `--accent` 値であることを検証（`variantFinal.jsx` L308）
  - H2 見出しの `font-size` が `24px`、`font-family` が `Noto Serif JP` であることを検証（`variantFinal.jsx` L328）
  - blockquote の `border-left` が `2px solid` かつ `--accent` 色であることを検証（`variantFinal.jsx` L333）
  - 右カラム（TOC）の `position` が `sticky`、`top` が `80px` であることを検証（`variantFinal.jsx` L339）
  - "Suggested for you" テキストが本文下部に存在することを検証（`variantFinal.jsx` L358-360）
  - Suggested Posts のグリッドが3カラムであることを検証（`variantFinal.jsx` L362）
  - モバイル（375px幅）で1カラムレイアウトになることを検証
  - **[デザイン比較]** デザイン参照（`data-dc-slot="post"`）とアプリの記事詳細ページのスクリーンショットを保存する
- [x] 6.2 **[RED確認]** `bun run test:integration -- e2e/post-layout.spec.ts` を実行してテストが失敗することを確認する
- [x] 6.3 `PostBody/index.astro` のレイアウトを `grid-cols-[180px_1fr_220px]` の3カラムに変更する
- [x] 6.4 左カラム（タグ+シェア）を `position: sticky; top: 80px` で配置する
- [x] 6.5 既存の `SideToc` コンポーネントを右カラムに移動し `sticky` を適用する
- [x] 6.6 記事ヘッダーをセンタリングレイアウト（max-width: 880px・中央揃え）に変更する
- [x] 6.7 本文タイポグラフィを更新する（H2 serif 24px・blockquote accent border-left 2px・本文 16px line-height 2.05）
- [x] 6.8 `SuggestedPost` セクションを3カラム記事カードグリッドに変更する
- [x] 6.9 **[GREEN確認]** `bun run test:integration -- e2e/post-layout.spec.ts` を実行してテストが全て通ることを確認する

## 7. カテゴリページ（TDD）

- [x] 7.1 **[テスト作成]** `e2e/category-header.spec.ts` を作成する
  - カテゴリページ上部に "Category" ラベルが存在することを検証（`variantFinal.jsx` L381）
  - カテゴリ名の `font-size` が `56px`、`font-family` が `Noto Serif JP` であることを検証（`variantFinal.jsx` L385）
  - カテゴリ名末尾に `color: var(--accent)` のピリオド要素が存在することを検証（`variantFinal.jsx` L386）
  - 記事数テキストに `JetBrains Mono` フォントが適用されていることを検証（`variantFinal.jsx` L390-393）
  - 全カテゴリ（CODE / BUSINESS / MATH / OTHER）のタブが横並びで存在することを検証（`variantFinal.jsx` L395-399）
  - 現在カテゴリタブの `background-color` が `--fg` 値、`color` が `--bg` 値であることを検証（`variantFinal.jsx` L397）
  - 他カテゴリタブをクリックすると対応するカテゴリページに遷移することを検証
  - **[デザイン比較]** デザイン参照（`data-dc-slot="category"`）とアプリのカテゴリページのスクリーンショットを保存する
- [x] 7.2 **[RED確認]** `bun run test:integration -- e2e/category-header.spec.ts` を実行してテストが失敗することを確認する
- [x] 7.3 `CategoryHeader/index.astro` を新規作成する（Category ラベル・カテゴリ名 56px serif + accent ピリオド・説明文・記事数 mono 右寄せ）
- [x] 7.4 `CategoryHeader` にカテゴリ切替タブ（全カテゴリ横並び・現在カテゴリハイライト）を追加する
- [x] 7.5 `pages/category/[category]/[page].astro` に `CategoryHeader` を組み込む
- [x] 7.6 **[GREEN確認]** `bun run test:integration -- e2e/category-header.spec.ts` を実行してテストが全て通ることを確認する

## 8. フッター・ページネーション（TDD）

- [x] 8.1 **[テスト作成]** `e2e/site-footer.spec.ts` を作成する
  - フッターの `grid-template-columns` に `2fr 1fr 1fr 1fr` が設定されていることを検証（`variantFinal.jsx` L244）
  - フッター内に "asunaroblog" テキストが存在することを検証（`variantFinal.jsx` L245）
  - "Category" "Elsewhere" "Newsletter" の各ラベルが存在することを検証（`variantFinal.jsx` L248-260）
  - "GitHub ↗" "X ↗" "RSS ↗" テキストが存在することを検証（`variantFinal.jsx` L257）
  - コピーライトテキストに `JetBrains Mono` が適用されていることを検証（`variantFinal.jsx` L265）
  - "built with Astro · Newt CMS" テキストが存在することを検証（`variantFinal.jsx` L266）
  - モバイル（375px幅）でフッターが縦積みになることを検証
- [x] 8.2 **[テスト作成]** `e2e/pagination.spec.ts` を作成する
  - "Previous" テキストを含む要素が存在することを検証（`variantFinal.jsx` L212）
  - "Next" テキストを含む要素が存在することを検証（`variantFinal.jsx` L231）
  - 現在ページのボタンの `background-color` が `--accent` 値であることを検証（`variantFinal.jsx` L222-223）
  - 1ページ目では Previous ボタンの `opacity` が `0.4` であることを検証（`variantFinal.jsx` L210）
  - 総ページ数が5以上の場合に "…" テキストが表示されることを検証（`variantFinal.jsx` L216-217）
- [x] 8.3 **[RED確認]** `bun run test:integration -- e2e/site-footer.spec.ts e2e/pagination.spec.ts` を実行してテストが失敗することを確認する
- [x] 8.4 `Footer/index.astro` を `2fr 1fr 1fr 1fr` の4カラムグリッドに全面書き換える（ブランド・カテゴリ・Elsewhere・Newsletter）
- [x] 8.5 フッター最下部にコピーライトバー（"© Asunaro" + "built with Astro · Newt CMS"）を追加する
- [x] 8.6 `Pagination/index.tsx` を「← Previous / Next → + ページ番号チップ + 省略表示」デザインに書き換える
- [x] 8.7 **[GREEN確認]** `bun run test:integration -- e2e/site-footer.spec.ts e2e/pagination.spec.ts` を実行してテストが全て通ることを確認する

## 9. レスポンシブ対応

- [x] 9.1 モバイル（768px 未満）でのヘッダーをハンバーガーメニューまたは縦積みナビに変更する
- [x] 9.2 記事詳細の3カラムをモバイルで1カラムに折りたたむ（タグは本文上部に移動）
- [x] 9.3 `playwright.config.ts` のモバイルプロジェクトを有効化して全テストをモバイルでも実行する
- [x] 9.4 `bun run test:integration` を Pixel 5 / iPhone 12 プロジェクトで実行し、全テストが通ることを確認する

## 10. デザイン比較・修正

- [x] 10.1 `bun run build` でビルドエラーがないことを確認する
- [x] 10.2 `bun run test:integration` で全テストが通ることを確認する
- [x] 10.3 **[全ページデザイン比較]** 以下の6パターンについてデザイン参照とアプリのスクリーンショットを `test-results/compare/` に並べて保存する
  - `home-light`: デザイン参照（Light）× トップページ（Light）
  - `home-dark`: デザイン参照（Dark）× トップページ（Dark）
  - `post-light`: デザイン参照（Light）× 記事詳細（Light）
  - `post-dark`: デザイン参照（Dark）× 記事詳細（Dark）
  - `category-light`: デザイン参照（Light）× カテゴリページ（Light）
  - `category-dark`: デザイン参照（Dark）× カテゴリページ（Dark）
- [x] 10.4 スクリーンショット比較で発見した視覚的差異をリストアップする
- [x] 10.5 **[デザイン修正]** リストアップした差異を修正する（色・フォントサイズ・余白・グリッド幅等）
- [x] 10.6 修正後に `bun run test:integration` で全テストが引き続き通ることを確認する
- [x] 10.7 修正後に再度スクリーンショット比較を実施し、デザイン案との一致を確認する
