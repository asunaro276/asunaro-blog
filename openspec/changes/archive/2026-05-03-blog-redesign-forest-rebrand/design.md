## Context

現在の asunaro-blog は Tailwind CSS のユーティリティクラスを直接コンポーネントに記述するスタイルで構築されており、カラーパレットは Tailwind のデフォルト色（slate, gray 系）に依存している。フォントは `Montserrat Subrayada` のみ Google Fonts から読み込み、日本語フォントは OS デフォルトに委ねている。レイアウトは 2 カラム（メイン + サイドバー）で、記事一覧はシンプルなカードリストで構成されている。

デザイン評価 26/40 点という結果を受け、独自性・トレンド適合性・配色の 3 項目を中心に全面リデザインを行う。デザイン案（`Rebrand.html`）は React+CSS custom properties で作成済みで、これを Astro + Tailwind のコンポーネント構成に移植する。

## Goals / Non-Goals

**Goals:**
- oklch ベースの CSS custom properties でテーマシステムを確立し、Light/Dark 切替に対応
- 編集誌スタイルのレイアウト（ヒーロー + 3カラムグリッド）を実装
- デザイン案 (`variantFinal.jsx`) の視覚的アウトプットを忠実に再現
- `#42 #44 #45 #47 #30 #3` の GitHub Issue を解消
- ホバーインタラクション・明確なページネーションで #43 も解消

**Non-Goals:**
- 検索機能の実装（#29 はヘッダーに検索ラベルを置くのみ、機能は別 Issue）
- CMS データ構造・ドメインモデルの変更
- パフォーマンス最適化（Core Web Vitals は別フェーズ）
- アニメーションライブラリの導入（CSS transition のみ）

## Decisions

### 1. カラーシステム: Tailwind デフォルト色 → CSS custom properties (oklch)

**決定**: `globals.scss` にテーマ変数を定義し、Tailwind の `theme.extend` で CSS vars を参照する形に移行する。

```css
:root, .theme-light {
  --bg:     oklch(0.985 0.008 110);
  --fg:     oklch(0.28  0.020 145);
  --accent: oklch(0.46  0.09  155);
  /* ... */
}
.theme-dark {
  --bg:     oklch(0.17  0.012 150);
  --fg:     oklch(0.94  0.010 130);
  --accent: oklch(0.78  0.10  145);
  /* ... */
}
```

**却下した代替案**:
- Tailwind の `darkMode: 'class'` + カスタムカラーパレット → oklch の `color-mix()` 関数と相性が悪く、ヒートマップのグラデーション表現が困難
- CSS-in-JS（styled-components 等）→ Astro の SSR モデルと相性が悪い

### 2. テーマ切替: システム設定を基準に `<html>` クラスで制御

**決定**: `Layout.astro` の `<html>` タグに `theme-light` / `theme-dark` クラスを付与する。初期値はシステムの `prefers-color-scheme` を参照し、ユーザーがトグルすると `localStorage` に保存する。

### 3. フォント: 4書体体系（CDN）

**決定**: Google Fonts から Inter・Noto Sans JP・Noto Serif JP・JetBrains Mono を読み込む。`font-display: swap` を指定し、CLS を最小化する。

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

CSS クラス `.font-sans-jp`, `.font-serif-jp`, `.font-mono` を定義して使い分ける。

### 4. ヒーローセクション: 新規 Astro コンポーネント

**決定**: `src/presentation/components/HomePage/HeroSection/index.astro` を新規作成し、最初の記事を Featured として表示する。`HomePage/index.astro` で `POSTS[0]` を Hero に、`POSTS.slice(1)` を 3カラムグリッドに渡す。

### 5. アーカイブヒートマップ: React クライアントコンポーネント

**決定**: インタラクティブなヒートマップは `ArchiveHeatmap/index.tsx` として React コンポーネントで実装し、`client:load` でハイドレートする。`YearMonth` ドメインモデルからデータを受け取る既存インターフェースを維持する。

### 6. 3カラム記事詳細レイアウト: Astro テンプレート変更

**決定**: `PostPage/PostBody/index.astro` のグリッドを `grid-cols-[180px_1fr_220px]` に変更。左カラム（タグ+シェア）は `position: sticky` で実装。既存の `SideToc` コンポーネントを右カラムに移動。

### 7. ホバーインタラクション: CSS transition のみ

**決定**: Framer Motion 等のライブラリは導入せず、CSS の `transition` と `transform` のみで実装する。カードのホバーで `translateY(-2px)` + `shadow` の変化、リンクのホバーで `color` 変化を付ける。

## Risks / Trade-offs

- **[Risk] oklch の ブラウザサポート** → `@supports (color: oklch(...))` フォールバックを用意する。ただし 2025年時点で主要ブラウザは全対応済みのため実用上問題ない
- **[Risk] Tailwind と CSS custom properties の混在** → Tailwind ユーティリティを残しつつ `bg-[var(--bg)]` の形で CSS vars を参照できるため共存可能。段階的に移行する
- **[Risk] Google Fonts CDN のパフォーマンス影響** → `preconnect` ヒントと `font-display: swap` で CLS を抑制。Lighthouse スコアへの影響は許容範囲内
- **[Risk] 3カラムレイアウトのモバイル対応** → モバイルでは記事詳細を 1カラムに折り畳む。サイドのタグ・TOC は本文上部に移動する
- **[Trade-off] 既存 Tailwind クラスの部分残存** → 全コンポーネントの書き直しは工数が大きいため、主要コンポーネントのみ CSS vars ベースに移行し、細部の Tailwind クラスは残す

## Migration Plan

1. `globals.scss` にテーマ変数を追加（既存スタイルを壊さない）
2. `Layout.astro` のフォント差し替えとテーマクラス初期化スクリプト追加
3. 共通コンポーネント（Header / Footer）を新デザインに差し替え
4. `SideBar` を新構成（Profile / Tags / ArchiveHeatmap）に差し替え
5. `PostCard` を新カードデザインに差し替え
6. `HeroSection` を新規作成し `HomePage` に組み込む
7. `PostPage` の3カラムレイアウトに変更
8. `CategoryHeader` を新規作成し カテゴリページに組み込む
9. `Pagination` を新デザインに差し替え
10. ビルド確認 + 各ページの目視確認

**ロールバック**: 各コンポーネントの変更は独立しているため、問題が発生したコンポーネントのみ git revert で戻せる。

## Open Questions

- ダークモード初期値: システム設定に追従するか、Light 固定にするか（現状 Light をデフォルトとして進める）
- カテゴリページの検索ラベル: ヘッダーの SEARCH はリンクとして `<a href="/search">` を置くのみで OK か（機能実装は別 Issue）
- `Noto Serif JP` の使用範囲: 見出しのみか、記事本文にも使用するか（デザイン案では見出し・ヒーロータイトル・カード見出しに限定）
