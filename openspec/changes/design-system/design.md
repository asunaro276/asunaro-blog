## Context

現状のスタイル管理：
- カラーは `globals.scss` の CSS カスタムプロパティ（oklch 色空間）で定義済み（10 変数）
- スペーシング・タイポグラフィはコンポーネントのインラインスタイルにハードコードされている（例: `padding: 16px`, `font-size: 56px`）
- Tailwind の `theme.extend.colors` は CSS 変数を参照しているが、`spacing` / `fontSize` の拡張は未定義
- Storybook のスクリプトは `package.json` にあるが `.storybook/` ディレクトリとストーリーファイルは存在しない
- `DESIGN.md` は存在しない

## Goals / Non-Goals

**Goals:**
- Google Stitch 公式仕様（YAML フロントマター + Markdown ボディの2層構造）に準拠した `DESIGN.md` をプロジェクトルートに作成する
- `tokens.scss` を新設し、`DESIGN.md` のトークンと対応する CSS カスタムプロパティを一元管理する
- `@storybook-astro/framework` で Storybook をセットアップし、Astro・React コンポーネントのストーリーを追加する

**Non-Goals:**
- 既存コンポーネントのインラインスタイルをトークン参照に置き換えること（別チェンジ）
- 色・フォント・レイアウトの視覚的変更
- Storybook のデプロイ設定（Chromatic 等）

## Decisions

### 1. DESIGN.md のフォーマット

**決定**: Google Stitch 公式仕様に完全準拠する。YAML フロントマターに機械可読トークン、Markdown ボディに人間可読の設計解説を記述する。

フロントマター構造：
```yaml
---
version: alpha
name: asunaroblog
description: ...
colors:
  primary: "#2D3B2F"          # --fg (light)
  secondary: "#5A6B5C"        # --fg-2
  tertiary: "#8A9A8C"         # --fg-3
  surface: "#F9FAF7"          # --bg
  surface-alt: "#F3F5F0"      # --bg-2
  surface-muted: "#EBEDE7"    # --bg-3
  accent: "#3A7050"           # --accent
  tint: "#DDF0E4"             # --tint
  rule: "#D6D9D2"             # --rule
  rule-alt: "#C5C9C0"         # --rule-2
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
  body-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.75
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
  tab-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
  tab-inactive:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.secondary}"
---
```

Markdown ボディは `## Overview` → `## Colors` → `## Typography` → `## Layout` → `## Elevation & Depth` → `## Shapes` → `## Components` → `## Do's and Don'ts` の順。

**理由**: 公式仕様準拠により将来的に Stitch CLI の lint・export 機能が使える。`{token.reference}` 形式でコンポーネントトークンが他トークンを参照できるため、変更が一元管理される。

**代替案**: Markdown のみ（採用しない — AI が値を正確にパースしにくい）

---

### 2. カラートークン名の方針

**決定**: 公式推奨名（`primary`, `secondary`, `surface`, `accent` 等）を採用し、既存の CSS 変数（`--fg`, `--bg` 等）と対応テーブルをボディに記載する。

**理由**: 推奨名に従うことで AI ツールとの互換性が高まる。既存 CSS 変数は変更しないため、対応テーブルで橋渡しをする。

**代替案**: `--fg` / `--bg` をそのままトークン名にする（採用しない — 公式推奨名との乖離が大きい）

---

### 3. カラー値のフォーマット

**決定**: DESIGN.md のフロントマターには sRGB hex（`#RRGGBB`）を使用する。CSS 変数は引き続き oklch を使用し、`tokens.scss` のコメントに hex 値を併記する。

**理由**: 公式仕様が `Color = # + hex code (sRGB)` と規定しているため。CSS での oklch は維持することでブラウザの色域メリットを保つ。

**代替案**: DESIGN.md も oklch（採用しない — 仕様違反になる）

---

### 4. tokens.scss の構造

**決定**: `src/presentation/styles/tokens.scss` を新設し、既存のカラー変数 + 新規スペーシング・タイポグラフィ変数をまとめる。`globals.scss` のカラー定義を `tokens.scss` に移動し `@use 'tokens' as *` でインポートする。

```scss
// tokens.scss
:root, .theme-light {
  // Colors (hex: #F9FAF7)
  --color-surface:        oklch(0.985 0.008 110);
  // ... 既存変数をリネームなしで移動
  
  // Spacing
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  // Rounded
  --rounded-sm:   4px;
  --rounded-md:   8px;
  --rounded-lg:   12px;
  --rounded-full: 9999px;
}
```

既存の `--bg`, `--fg` 等の変数名は変更しない（コンポーネントへの影響を避けるため）。新規トークンのみ `--space-*`, `--rounded-*` の命名で追加する。

**理由**: 既存コンポーネントを壊さずに新規トークンを追加できる最小コストの構成。

**代替案**:
- 既存変数を `--color-surface` 等にリネーム（採用しない — 全コンポーネント修正が必要）
- `globals.scss` に追記（採用しない — ファイルが肥大化する）

---

### 5. Storybook のセットアップ

**決定**: `@storybook-astro/framework` + `@storybook/builder-vite` を使用する。Astro の `srcDir` が `src/presentation/` のため、`.storybook/main.ts` に `storiesPath` と `viteFinal` で Astro の設定を引き継ぐ。

`.storybook/main.ts` の要点：
```ts
import type { StorybookConfig } from "@storybook-astro/framework";
const config: StorybookConfig = {
  framework: "@storybook-astro/framework",
  stories: ["../src/presentation/**/*.stories.{tsx,jsx,astro}"],
  addons: ["@chromatic-com/storybook"],
};
```

`.storybook/preview.ts` でグローバルスタイル（`tokens.scss`, `globals.scss`）をインポートする。

**理由**: Astro + React の両コンポーネントを1つの Storybook で管理できる唯一の選択肢。

---

### 6. ストーリーの書き方

Astro コンポーネントのストーリーは `.stories.tsx` で書き、`args` で静的フィクスチャデータを渡す：

```tsx
import CategoryHeader from "./index.astro";
export default { title: "common/CategoryHeader", component: CategoryHeader };
export const Default = {
  args: {
    category: { id: "1", name: "Tech", urlSlug: "tech" },
    categories: [{ id: "1", name: "Tech", urlSlug: "tech" }],
    totalCount: 42,
  },
};
```

### 7. Storybook の Cloudflare Pages デプロイ

**決定**: 既存の Cloudflare Pages プロジェクトを流用し、`bun run build-storybook` でビルドした `storybook-static/` を `wrangler pages deploy` でデプロイする。GitHub Actions ワークフロー（`.github/workflows/deploy-storybook.yml`）で main ブランチへのプッシュ時に自動実行する。カスタムドメイン `designsystem.asunaroblog.net` は Cloudflare Pages のダッシュボードで設定する。

```yaml
# .github/workflows/deploy-storybook.yml の骨格
on:
  push:
    branches: [main]
jobs:
  deploy:
    steps:
      - uses: actions/checkout@v4
      - run: bun install && bun run build-storybook
      - run: bunx wrangler pages deploy storybook-static --project-name=<既存プロジェクト名>
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

**理由**: 既存プロジェクトを流用することで新規プロジェクト作成・DNS 設定の手間を最小化できる。wrangler は既にプロジェクトに入っている可能性が高い。

**代替案**: Chromatic（採用しない — 有料・外部サービス依存）

## Risks / Trade-offs

- `@storybook-astro/framework` は Storybook 本体のバージョン依存が強い → Storybook バージョンをロックし、更新時にテストで確認
- Astro コンポーネントのストーリーは CMS 依存データをモックする必要がある → `args` で静的フィクスチャを渡す
- `globals.scss` の `@use` への変更はビルドエラーリスクがある → 変更後に `bun run build` で確認してからコミット
- DESIGN.md の hex カラー値は oklch の近似値であり、正確な変換が必要 → `python3` や CSS `color()` 関数で変換を確認

## Open Questions

- Storybook のデプロイ先（Chromatic or セルフホスト）— 今回スコープ外
- CLAUDE.md への DESIGN.md 参照追記の具体的な記述内容 — tasks フェーズで決定
