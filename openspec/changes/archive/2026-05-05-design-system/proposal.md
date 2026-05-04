## Why

色・スペーシング・タイポグラフィ・コンポーネントのデザイン判断がコードに暗黙的に散在しており、AI と人間が新しいコンポーネントを実装する際に「なぜこの値を使うか」の共通認識がない。DESIGN.md を軸としたデザインシステムを整備することで、Claude が実装時に参照できる唯一の正解ファイルを確立し、一貫性のある UI 生成を可能にする。

## What Changes

- プロジェクトルートに `DESIGN.md` を新設 — カラートークン・タイポグラフィ・スペーシングスケール・コンポーネント原則・Do/Don't を記述した AI + 人間の共通参照ドキュメント
- デザイントークンの拡充 — 既存のカラー変数（`--bg`, `--fg`, `--accent` 等）に加え、スペーシング・フォントサイズ・フォントウェイト・行間・角丸の CSS カスタムプロパティを体系化し `tokens.scss` として分離する
- Storybook のセットアップ — `@storybook-astro/framework` を用いて `.storybook/` 設定を作成し、既存の Astro・React コンポーネント（Header, Footer, SideBar, Pagination, PostBody 系等）のストーリーを追加する
- Storybook の公開デプロイ — ビルドした Storybook を既存の Cloudflare Pages プロジェクトへ GitHub Actions で自動デプロイし、`designsystem.asunaroblog.net` で公開アクセス可能にする

## Capabilities

### New Capabilities

- `design-md`: プロジェクトルートの `DESIGN.md` — AI と人間が参照するデザイン仕様の唯一の情報源。カラーパレット・タイポグラフィ・スペーシングスケール・コンポーネント原則・禁止事項を含む
- `design-tokens`: `src/presentation/styles/tokens.scss` — 色・スペーシング・タイポグラフィの CSS カスタムプロパティ定義を一元管理するトークンファイル
- `component-catalog`: Storybook (`@storybook-astro/framework`) による Astro + React コンポーネントカタログ — `.storybook/` 設定 + 各コンポーネントの `.stories.tsx` ファイル群
- `storybook-deploy`: `designsystem.asunaroblog.net` への Storybook 公開デプロイ — GitHub Actions ワークフロー（`wrangler pages deploy`）で main ブランチへのプッシュ時に自動ビルド・デプロイ

### Modified Capabilities

- `theme-system`: 既存のカラー変数定義を `globals.scss` から `tokens.scss` に移動し、`globals.scss` は `@use` でインポートする形に再構成する

## Impact

- `DESIGN.md` — プロジェクトルートに新規作成
- `src/presentation/styles/tokens.scss` — 新規作成（カラー・スペーシング・タイポグラフィ変数）
- `src/presentation/styles/globals.scss` — トークン定義を `tokens.scss` に移動し `@use` で参照
- `.storybook/main.ts`, `.storybook/preview.ts` — Storybook 設定ファイルの新規作成
- `src/presentation/components/**/*.stories.tsx` — 各 Astro・React コンポーネントのストーリー追加
- `CLAUDE.md` — DESIGN.md の参照方法を追記
- `.github/workflows/deploy-storybook.yml` — Storybook ビルド & Cloudflare Pages デプロイの GitHub Actions ワークフロー
