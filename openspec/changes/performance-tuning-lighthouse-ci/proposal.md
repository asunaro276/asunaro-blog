## Why

ブログサイトのページ遷移・初期ロードが遅く、ユーザー体験を損なっている。パフォーマンス問題を可視化・定量化する計測基盤を整備した上で、施策ごとの効果を測定しながら改善を進める必要がある。

## What Changes

- GitHub Actions上でCloudflare Pagesへのデプロイを行うワークフローを追加し、プレビューURLを発行できるようにする
- Lighthouse CIをGitHub Actionsで実行する仕組みを導入し、PRごとにパフォーマンス指標を自動計測する
- Lighthouse CIの計測結果をもとに現状のパフォーマンスを把握し、改善目標値（LCP・TBT・CLS等）を設定する
- 目標値達成に向けた施策（画像最適化・バンドル削減・キャッシュ戦略等）を優先度順に実装・評価する

## Capabilities

### New Capabilities

- `lighthouse-ci`: GitHub Actions上でLighthouse CIを実行し、プレビュー環境のパフォーマンスを自動計測してPRにレポートする機能
- `cloudflare-ci-deploy`: GitHub ActionsからCloudflare Pagesへデプロイし、ブランチごとのプレビューURLを払い出す機能

### Modified Capabilities

## Impact

- `.github/workflows/`: CI/CDワークフローの追加（デプロイ・Lighthouse CI実行）
- Cloudflare Pagesのデプロイ設定（GitHub統合からCI経由に変更）
- `lighthouserc.json` または `lighthouserc.js`：Lighthouse CI設定ファイルの追加
- GitHub Secrets：Cloudflare API Token等の機密情報管理
- 既存のコンポーネント・アセット：パフォーマンス施策実装時に変更対象になりうる
