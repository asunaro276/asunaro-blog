## 1. デザイントークン（tokens.scss）

- [x] 1.1 `src/presentation/styles/tokens.scss` を新規作成し、既存のカラー変数（`:root, .theme-light` / `.theme-dark`）を `globals.scss` から移動する
- [x] 1.2 `tokens.scss` にスペーシングトークン（`--space-xs` ～ `--space-3xl`）を追加する
- [x] 1.3 `tokens.scss` に角丸トークン（`--rounded-sm` ～ `--rounded-full`）を追加する
- [x] 1.4 `globals.scss` を修正して `@use './tokens' as *` でインポートし、カラー変数の直接定義を削除する
- [x] 1.5 `bun run build` でビルドエラーがないことを確認する

## 2. DESIGN.md

- [x] 2.1 oklch カラー値を sRGB hex に変換するスクリプトを実行し、全10変数の hex 値を確認する
- [x] 2.2 プロジェクトルートに `DESIGN.md` を作成する（YAML フロントマター：`version`, `name`, `colors`, `typography`, `spacing`, `rounded`, `components`）
- [x] 2.3 `## Overview` セクションを記述する（ブランド・ペルソナ・感情的目標）
- [x] 2.4 `## Colors` セクションを記述する（CSS 変数との対応テーブルを含む）
- [x] 2.5 `## Typography` セクションを記述する（フォントファミリー・タイポグラフィスケール）
- [x] 2.6 `## Layout` セクションを記述する（グリッド・最大幅・スペーシングスケール）
- [x] 2.7 `## Elevation & Depth`, `## Shapes`, `## Components`, `## Do's and Don'ts` の各セクションを記述する
- [x] 2.8 `CLAUDE.md` にコンポーネント実装時は `DESIGN.md` を参照する旨を追記する

## 3. Storybook セットアップ

- [x] 3.1 `@storybook-astro/framework`, `@storybook/builder-vite` をインストールする
- [x] 3.2 `.storybook/main.ts` を作成する（framework, stories glob, addons を設定）
- [x] 3.3 `.storybook/preview.ts` を作成し、`tokens.scss` と `globals.scss` をグローバルインポートする
- [x] 3.4 `bun run storybook` で起動確認し、エラーがないことを確認する

## 4. コンポーネントストーリー（Astro）

- [x] 4.1 `common/CategoryHeader/index.stories.tsx` を作成する（Default, MultipleCategories バリアント）
- [x] 4.2 `common/Header/index.stories.tsx` を作成する（カテゴリ一覧付きのバリアント）
- [x] 4.3 `common/Footer/index.stories.tsx` を作成する
- [x] 4.4 `HomePage/PostsList/PostCard/index.stories.tsx` を作成する（カバー画像あり・なしのバリアント）

## 5. コンポーネントストーリー（React）

- [x] 5.1 `HomePage/Pagination/PaginationItem/index.stories.tsx` を作成する（Active, Inactive バリアント）
- [x] 5.2 `common/SideBar/ArchiveHeatmap/index.stories.tsx` を作成する（サンプルデータ付き）

## 6. Storybook ビルド確認

- [x] 6.1 `bun run build-storybook` を実行し、`storybook-static/` が生成されることを確認する

## 7. Cloudflare Pages デプロイ

- [x] 7.1 既存 Cloudflare Pages プロジェクト名を確認し、`wrangler pages deploy storybook-static --project-name=<名前>` で手動デプロイを確認する
- [x] 7.2 Cloudflare Pages のダッシュボードでカスタムドメイン `designsystem.asunaroblog.net` を設定する
- [x] 7.3 `.github/workflows/deploy-storybook.yml` を作成する（checkout → bun install → build-storybook → wrangler deploy）
- [x] 7.4 GitHub リポジトリに `CLOUDFLARE_API_TOKEN` シークレットを設定する
- [x] 7.5 main へのプッシュでワークフローが成功し、`https://designsystem.asunaroblog.net` でアクセスできることを確認する
