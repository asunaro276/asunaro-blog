## Why

OpenSpec の `changes/` や `specs/` に蓄積した設計ドキュメントは Markdown ファイルとして存在するが、GitHub リポジトリのファイルツリーを手動で辿らないと参照できない。静的サイトとして GitHub Pages に公開することで、ブラウザから一覧・検索・閲覧できる開発者ポータルを整備する。

## What Changes

- GitHub Actions ワークフローを追加し、`main` ブランチへのプッシュ時に `openspec/` 配下の Markdown を HTML 化して GitHub Pages へデプロイする
- `openspec/` ディレクトリを入力とし、changes・specs のインデックスページおよび各ドキュメントページを生成する静的サイトジェネレーター（スクリプト）を追加する
- トップページにはすべての changes と specs の一覧を表示し、各ページにはそのドキュメントの Markdown をレンダリングして表示する

## Capabilities

### New Capabilities

- `openspec-pages-site`: `openspec/` の Markdown を GitHub Pages 向け静的 HTML に変換するビルドスクリプト
- `openspec-pages-deploy`: GitHub Actions で変換・デプロイを自動化するワークフロー

### Modified Capabilities

（なし）

## Impact

- `openspec/` ディレクトリの Markdown ファイル（読み取りのみ）
- GitHub Actions ワークフローファイル（`.github/workflows/`）の追加
- `package.json` にビルドスクリプト追加の可能性
- 本番ブログサイト（asunaroblog.net）のコードには一切影響しない
