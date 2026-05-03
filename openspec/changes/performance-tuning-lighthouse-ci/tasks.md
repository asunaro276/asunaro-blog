## 1. Cloudflare CI デプロイ基盤の構築

- [ ] 1.1 Cloudflare DashboardでPages:Edit権限を持つAPIトークンを発行する
- [ ] 1.2 GitHubリポジトリのSecretsに `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を登録する
- [ ] 1.3 `.github/workflows/preview.yml` を作成し、PRへのpushでビルドとCloudflare Pagesプレビューデプロイが実行されるようにする（`cloudflare/wrangler-action` を使用）
- [ ] 1.4b `.github/workflows/deploy.yml` を作成し、mainへのpushでビルドとCloudflare Pagesのproductionデプロイが実行されるようにする
- [ ] 1.4 PRを作成してデプロイが正常に動作し、プレビューURLが取得できることを確認する
- [ ] 1.5 Cloudflare DashboardのGitHub統合を無効化する（二重デプロイを防ぐ）

## 2. Lighthouse CI の導入（単一ページ計測）

- [ ] 2.1 `@lhci/cli` を devDependencies に追加する（`bun add -d @lhci/cli`）
- [ ] 2.2 `lighthouserc.json` を作成し、計測URL・numberOfRuns（3回）・assertionsを設定する
- [ ] 2.3 `.github/workflows/preview.yml` にLighthouse CIステップを追加し、デプロイ後のプレビューURLを渡して計測を実行する
- [ ] 2.4 LHCI結果を `temporary-public-storage` にアップロードする設定を追加する
- [ ] 2.5 PRを作成してLighthouse CIが正常に実行され、レポートURLがActionsログに出力されることを確認する

## 3. Lighthouse User Flows の導入（遷移計測）

- [ ] 3.1 Puppeteer（`puppeteer-core`）またはPlaywright既存ChromiumとLighthouse User Flows APIの互換性を確認し、使用するブラウザドライバを決定する
- [ ] 3.2 `scripts/lighthouse-flow.js` を作成する（トップページロード → 記事カードクリック → 遷移完了の3ステップ）
- [ ] 3.3 `.github/workflows/preview.yml` にUser Flowsステップを追加し、フローレポートHTMLを生成する
- [ ] 3.4 フローレポートHTMLをGitHub Actions Artifactsとしてアップロードする設定を追加する
- [ ] 3.5 PRを作成してUser Flowsが正常に実行され、遷移のレポートが確認できることを検証する

## 4. ベースライン計測と目標値の確定

- [ ] 4.1 mainブランチのプレビューで単一ページLighthouse CIを実行し、現状のスコアを記録する（Performance / LCP / TBT / CLS / FCP）
- [ ] 4.2 User Flowsを実行し、View Transitions遷移の現状パフォーマンスを記録する
- [ ] 4.3 計測結果をもとに `lighthouserc.json` のアサーション目標値を調整し、`warn` から `error` に昇格させる
- [ ] 4.4 目標値をREADME等に記録する

## 5. パフォーマンス施策の実装と評価

- [ ] 5.1 施策候補をLighthouseレポートのOpportunities/DiagnosticsおよびUser Flowsレポートをもとに洗い出し、優先順位を決める
- [ ] 5.2 施策1（例: `prefetch: true` 設定によるView Transitions遷移の先読み）をブランチで実装し、User Flowsのスコアを確認して採用判断する
- [ ] 5.3 施策2（例: 画像フォーマット最適化・`width`/`height` 属性追加によるCLS改善）をブランチで実装し、Lighthouse CIのスコアを確認して採用判断する
- [ ] 5.4 施策3（例: フォント読み込み最適化・`font-display: swap` / preloadの設定）をブランチで実装し、スコアを確認して採用判断する
- [ ] 5.5 施策4（例: JavaScriptバンドル削減・未使用コードのtree-shaking強化）をブランチで実装し、スコアを確認して採用判断する
- [ ] 5.6 採用した施策をmainにマージし、最終スコアが全目標値を達成していることを確認する
