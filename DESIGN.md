---
version: alpha
name: asunaroblog
description: 自然・静けさ・知性をテーマにした個人技術ブログのデザインシステム。森緑とオフホワイトを基調とし、読みやすさと落ち着きを重視する。
colors:
  primary: "#2D3B2F"
  secondary: "#5A6B5C"
  tertiary: "#8A9A8C"
  surface: "#F9FAF7"
  surface-alt: "#F3F5EF"
  surface-muted: "#EBEDE6"
  accent: "#3A7050"
  tint: "#DDF0E4"
  rule: "#D6D9D2"
  rule-alt: "#C5C9C0"
typography:
  headline-display:
    fontFamily: Noto Serif JP
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.2
  headline-lg:
    fontFamily: Noto Serif JP
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.3
  headline-md:
    fontFamily: Noto Serif JP
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.4
  body-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
  body-sm:
    fontFamily: Noto Sans JP
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: 600
    letterSpacing: 0.14em
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
components:
  post-card:
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.rule}"
  tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.md}"
  tab-inactive:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.md}"
  category-badge:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.sm}"
  pagination-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
  pagination-inactive:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
---

## Overview

**asunaroblog** は「自然・静けさ・知性」をブランドテーマとした個人技術ブログです。

- **ブランドカラー**: 森緑（Forest Green）とオフホワイト（Warm White）
- **ペルソナ**: 深く読み込むエンジニア・学習者。スキャンではなく精読を前提とする
- **感情的目標**: 落ち着き・信頼感・読みやすさ。情報密度を高めながらも圧迫感を排除する

### ダークモード

ライトモードの暖かみのある白と森緑を、深みのある深緑に置き換える。目への負担を減らしながら、ブランドの一貫性を維持する。

---

## Colors

### パレット

| トークン名      | CSS変数    | Light hex  | Dark hex   | 用途                         |
|----------------|-----------|-----------|-----------|------------------------------|
| `primary`      | `--fg`    | `#2D3B2F` | `#EDF0EA` | メインテキスト               |
| `secondary`    | `--fg-2`  | `#5A6B5C` | `#B8C5BB` | サブテキスト・ラベル          |
| `tertiary`     | `--fg-3`  | `#8A9A8C` | `#8A9A8C` | プレースホルダー・disabled    |
| `surface`      | `--bg`    | `#F9FAF7` | `#1C2420` | ページ背景                   |
| `surface-alt`  | `--bg-2`  | `#F3F5EF` | `#252E29` | カード・セクション背景        |
| `surface-muted`| `--bg-3`  | `#EBEDE6` | `#2E3831` | ホバー状態・非アクティブ要素  |
| `accent`       | `--accent`| `#3A7050` | `#C5DFB8` | リンク・CTAボタン・ハイライト |
| `tint`         | `--tint`  | `#DDF0E4` | `#2D4A35` | アクセントの薄い背景          |
| `rule`         | `--rule`  | `#D6D9D2` | `#3D5044` | 区切り線・ボーダー            |
| `rule-alt`     | `--rule-2`| `#C5C9C0` | `#4D6357` | 強調ボーダー                 |

### 使用原則

- テキストには `primary` / `secondary` / `tertiary` を階層的に使用する
- インタラクティブ要素（リンク・ボタン）には必ず `accent` を使用する
- 背景は `surface` → `surface-alt` → `surface-muted` の順に深度を表現する

---

## Typography

### フォントファミリー

| 用途          | フォント        | CSS クラス         |
|--------------|-----------------|-------------------|
| 見出し        | Noto Serif JP   | `.font-serif-jp`  |
| 本文・UI     | Noto Sans JP    | `.font-sans-jp`   |
| コード・ラベル | JetBrains Mono  | `.font-mono`      |

### タイポグラフィスケール

| トークン           | フォント        | サイズ | ウェイト | 行間  | 用途               |
|-------------------|----------------|-------|--------|------|-------------------|
| `headline-display`| Noto Serif JP  | 56px  | 700    | 1.2  | トップページヒーロー |
| `headline-lg`     | Noto Serif JP  | 36px  | 700    | 1.3  | ページタイトル       |
| `headline-md`     | Noto Serif JP  | 24px  | 700    | 1.4  | セクション見出し     |
| `body-md`         | Noto Sans JP   | 16px  | 400    | 1.75 | 本文・説明文        |
| `body-sm`         | Noto Sans JP   | 14px  | 400    | 1.6  | メタ情報・キャプション|
| `label-caps`      | JetBrains Mono | 11px  | 600    | —    | カテゴリ・タグラベル  |

### 使用原則

- 見出しには必ず Noto Serif JP を使用し、文書の構造を明確にする
- 本文の行間は 1.75 を維持し、長文の読みやすさを確保する
- `label-caps` はすべて大文字ではなく、`letter-spacing: 0.14em` で視覚的にラベルらしさを出す

---

## Layout

### グリッドとコンテナ

| 要素              | 値          |
|------------------|------------|
| 最大幅（本文）     | 768px      |
| 最大幅（全体）     | 1200px     |
| サイドバー幅       | 280px      |
| コンテンツ/サイドバーレイアウト | CSS Grid |

### スペーシングスケール

| トークン      | CSS変数         | 値    | 用途                          |
|-------------|----------------|------|------------------------------|
| `xs`        | `--space-xs`   | 4px  | アイコンとテキストの間隔        |
| `sm`        | `--space-sm`   | 8px  | タグ・バッジの内側余白          |
| `md`        | `--space-md`   | 16px | カードの内側余白・基本的な間隔   |
| `lg`        | `--space-lg`   | 24px | セクション内の要素間隔           |
| `xl`        | `--space-xl`   | 32px | セクション間隔                  |
| `2xl`       | `--space-2xl`  | 48px | ページ内の大きなセクション間隔   |
| `3xl`       | `--space-3xl`  | 64px | ページ上下の余白                |

### レスポンシブブレークポイント

| ブレークポイント | 値     | 変更内容                    |
|---------------|-------|----------------------------|
| `sm`          | 640px  | —                          |
| `md`          | 768px  | サイドバー表示               |
| `lg`          | 1024px | 最大幅コンテナ適用            |

---

## Elevation & Depth

このサイトでは影（box-shadow）を最小限に抑え、**背景色の濃淡**で奥行きを表現する。

| レベル | 手法                        | 使用箇所           |
|------|----------------------------|--------------------|
| 0    | `surface`（ページ背景）      | ページ全体          |
| 1    | `surface-alt`（カード背景）  | 記事カード・ウィジェット |
| 2    | `surface-muted`（ホバー）   | インタラクティブ要素   |
| 3    | `rule` ボーダー             | 区切り線・カード枠    |

ルール: **影を使う場合は 1px solid `--rule` のボーダーと組み合わせる**。影単独は使用しない。

---

## Shapes

| トークン        | CSS変数            | 値      | 用途                        |
|--------------|-------------------|--------|-----------------------------|
| `sm`         | `--rounded-sm`    | 4px    | タグ・バッジ・ボタン          |
| `md`         | `--rounded-md`    | 8px    | カード・入力フィールド         |
| `lg`         | `--rounded-lg`    | 12px   | モーダル・ドロップダウン       |
| `full`       | `--rounded-full`  | 9999px | アバター・ピル型バッジ         |

ルール: **角丸はトークンのみ使用する**。任意の `px` 値は使用しない。

---

## Components

### PostCard

記事一覧に表示されるカードコンポーネント。

- 背景: `surface-alt`、ボーダー: 1px solid `rule`、角丸: `rounded.md`
- 内側余白: `spacing.md`
- カバー画像は上部に配置、アスペクト比 16:9 固定
- カテゴリバッジは `tint` 背景 + `accent` テキスト + `rounded.full`
- タイトルは `headline-md` スタイル
- 日付・タグは `body-sm` + `tertiary` カラー

### Header

- 背景: `surface` + `rule` ボーダーボトム
- ロゴ: `primary` カラー + Noto Serif JP
- ナビゲーションリンク: `secondary` カラー、ホバー時 `primary`

### CategoryHeader（タブナビゲーション）

- アクティブタブ: `tab-active`（`primary` 背景 + `surface` テキスト）
- 非アクティブタブ: `tab-inactive`（`surface-muted` 背景 + `secondary` テキスト）

### Pagination

- アクティブページ: `accent` 背景 + `surface` テキスト
- その他: `surface-muted` 背景 + `secondary` テキスト
- 角丸: `rounded.sm`

---

## Do's and Don'ts

### Do's ✓

- カラーはすべてCSS変数（`var(--bg)`、`var(--accent)` 等）で参照する
- スペーシングは `--space-*` トークンを優先する
- 角丸は `--rounded-*` トークンのみ使用する
- 見出しに Noto Serif JP、本文に Noto Sans JP を使い分ける
- ダークモードは `.theme-dark` クラスで自動切り替えされることを前提にデザインする
- インタラクティブ要素には必ずホバー状態を定義する

### Don'ts ✗

- ハードコードされたカラー値（`#2D3B2F`、`rgb(...)` 等）を直接 CSS に書かない
- Tailwind の任意値（`text-[#2D3B2F]`）でカラーを指定しない
- `box-shadow` を背景色の代わりに奥行き表現に使わない
- 任意の `border-radius` 値（`border-radius: 6px` 等）を使わない
- `font-weight: 500` など、定義外のフォントウェイトを使わない
