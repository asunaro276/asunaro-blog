## ADDED Requirements

### Requirement: GitHub Actions による自動デプロイワークフロー
`.github/workflows/deploy-storybook.yml` が存在し、main ブランチへのプッシュ時に Storybook をビルドして Cloudflare Pages にデプロイする。

#### Scenario: ワークフローファイルが存在する
- **WHEN** `.github/workflows/` を確認する
- **THEN** `deploy-storybook.yml` が存在する

#### Scenario: main ブランチへのプッシュでデプロイがトリガーされる
- **WHEN** `deploy-storybook.yml` を確認する
- **THEN** `on.push.branches` に `main` が含まれている

#### Scenario: ワークフローが Storybook をビルドしてデプロイする
- **WHEN** `deploy-storybook.yml` のジョブを確認する
- **THEN** `bun run build-storybook` を実行するステップが存在する
- **THEN** `wrangler pages deploy storybook-static` を実行するステップが存在する
- **THEN** `CLOUDFLARE_API_TOKEN` シークレットを参照している

### Requirement: designsystem.asunaroblog.net での公開アクセス
デプロイ後に `https://designsystem.asunaroblog.net` で Storybook に公開アクセスできる。

#### Scenario: カスタムドメインでアクセスできる
- **WHEN** `https://designsystem.asunaroblog.net` にブラウザでアクセスする
- **THEN** Storybook のトップページが表示される
- **THEN** コンポーネントのサイドバーナビゲーションが正常に機能する
