## Context

現在、Cloudflare PagesはGitHubリポジトリとの直接統合（Cloudflare Dashboard経由）でデプロイされている。この方式ではGitHub Actionsからプレビュー URLを取得する手段がなく、Lighthouse CIとの連携が困難である。

パフォーマンス改善の前提として、PRごとに自動でLighthouseスコアを計測・比較できる基盤が必要。計測基盤ができた後、施策を1つずつブランチで実装してスコアを比較し、採用判断を行う。

## Goals / Non-Goals

**Goals:**
- GitHub ActionsからCloudflare Pagesへデプロイし、ブランチごとのプレビューURLを取得できるようにする
- Lighthouse CIをGitHub Actionsで実行し、PRにスコアレポートをコメントする
- ベースライン計測を行い、改善目標値（LCP・TBT・CLS・Performanceスコア）を設定する
- 目標値を達成するまで施策ブランチで改善を繰り返す

**Non-Goals:**
- バックエンド（Newt CMS）側のパフォーマンス改善
- Cloudflare DashboardのGitHub統合設定の削除（移行後に手動で無効化する）
- Lighthouse以外の計測ツール（WebPageTest等）の導入

## Decisions

### 1. CloudflareデプロイはWrangler CLIを使用する

`wrangler pages deploy` コマンドでビルド済み成果物（`dist/`）をデプロイする。`cloudflare/wrangler-action` GitHub Actionを使用することで、デプロイ出力からプレビューURLを取得できる。

**代替案：** Cloudflare Pages Action（`cloudflare/pages-action`）→ 非推奨・メンテが止まっているため採用しない。

**必要なSecrets：**
- `CLOUDFLARE_API_TOKEN`：Pages:Edit権限を持つAPIトークン
- `CLOUDFLARE_ACCOUNT_ID`：CloudflareアカウントID

### 2. Lighthouse CIは `@lhci/cli` をGitHub Actionsで直接実行する

`lhci autorun` コマンドを使い、プレビュー URLに対して計測を実行する。レポートは `--upload.target=temporary-public-storage` でLHCI公開ストレージにアップロードし、URLをPRコメントに記載する。

**代替案：** `treosh/lighthouse-ci-action` → 内部的に同じ `@lhci/cli` を使うが、設定の柔軟性が低いため採用しない。

### 3. 計測は「単一ページ計測」と「User Flowsによる遷移計測」の2種類を行う

サイトはAstro View Transitionsを使用しており、遷移速度が体感パフォーマンスに直結する。標準のLighthouse CIは単一URLの初期ロードしか計測できないため、View Transitions経由のページ遷移には**Lighthouse User Flows**を併用する。

**単一ページ計測（`lhci autorun`）：**
- `{PREVIEW_URL}/`：トップページの初期ロード
- `{PREVIEW_URL}/blog/{ARTICLE_SLUG}/`：記事ページの初期ロード

**User Flows計測（Puppeteer + `lighthouse/flow` API）：**
- トップページをロード → 記事カードをクリック → 記事詳細ページへの遷移を記録
- `timespan` モードでView Transitions中のレイアウトシフトやスクリプト実行時間を計測
- スクリプトは `scripts/lighthouse-flow.js` として管理し、GitHub Actionsから実行する

**代替案：** Playwrightのみで計測 → Lighthouseほどの詳細な診断情報（Opportunities/Diagnostics）が得られないため、User Flowsを採用する。

### 4. パフォーマンス目標値（Lighthouse CI assertions）

初回ベースライン計測後に実績値を確認して調整するが、初期設定として下記を使用する：

| 指標 | 目標値 |
|------|--------|
| Performance Score | ≥ 90 |
| LCP | ≤ 2,500ms |
| TBT | ≤ 200ms |
| CLS | ≤ 0.1 |
| FCP | ≤ 1,800ms |

assertionsはベースライン後に `warn` から `error` に昇格させる段階的アプローチを取る。

### 5. ワークフローは用途別に2つ構成する

- **`preview.yml`**：PRへのpushでトリガー。ブランチをプレビューデプロイし、Lighthouse CIを実行する。
- **`deploy.yml`**：mainへのpushでトリガー。`wrangler pages deploy --branch=main` でproductionデプロイを行う。Lighthouse CIは実行しない（PRで評価済みのため）。

Cloudflare Pagesはブランチがmainのときproductionエイリアス（`https://asunaroblog.net`）にルーティングする仕様を利用する。

## Risks / Trade-offs

- **Cloudflare二重デプロイ**：GitHub統合とGitHub ActionsのCIが同時に動くと二重デプロイが発生する。→ CI導入後、Cloudflare DashboardでGitHub統合を手動で無効化する。
- **ビルド時間増加**：デプロイ＋Lighthouseで約3〜5分追加される。→ 許容範囲とする。
- **Lighthouseのネットワーク変動**：GitHub ActionsのランナーからCloudflareプレビュー環境への計測はネットワーク環境に左右される。→ 単一ページ計測は3回計測してメジアンを使用（`numberOfRuns: 3`）。User Flowsは1回実行のみ（複数回はコスト大）。
- **User Flowsの実行コスト**：PuppeteerをGitHub Actionsで動かすため、Chromiumのインストールが必要。→ `playwright` は既導入済みのため、Puppeteerを別途インストールせず `@playwright/browser-chromium` を流用することを検討する。
- **Cloudflare APIトークン管理**：Secretsが漏洩するとデプロイが乗っ取られる。→ Pages:Editのみの最小権限トークンを発行する。

## Migration Plan

1. CloudflareでAPIトークン（Pages:Edit）を発行し、GitHub Secretsに登録
2. `wrangler.toml`（またはCLIフラグ）でPages projectを指定
3. `.github/workflows/preview.yml` を追加（PRブランチ：ビルド→プレビューデプロイ→Lighthouse CI）
3b. `.github/workflows/deploy.yml` を追加（main：ビルド→productionデプロイ）
4. `lighthouserc.json` を追加
5. PRを作成して動作確認
6. 問題なければCloudflare DashboardのGitHub統合を無効化
7. ベースラインスコアをPRコメントで確認し、目標値を調整
8. 改善施策ブランチを順次作成・評価

**ロールバック：** Cloudflare DashboardのGitHub統合を再有効化すれば元の状態に戻せる。

## Open Questions

- `wrangler pages deploy` 時のプロジェクト名（Cloudflare Dashboard上の名前）の確認が必要
- 記事ページのサンプルスラッグ（代表的な記事のパス）をどれにするか
- User Flows実行にPuppeteer（`puppeteer-core`）を使うか、Playwrightの既存Chromiumを使うか（互換性の確認が必要）
