## 1. 依存パッケージの追加

- [ ] 1.1 `marked` を devDependencies に追加する（`bun add -d marked`）
- [ ] 1.2 `@types/marked` を devDependencies に追加する（型情報）

## 2. ビルドスクリプトの実装

- [ ] 2.1 `scripts/build-openspec-pages.ts` を新規作成する
- [ ] 2.2 `openspec/changes/` を走査して変更一覧を収集するロジックを実装する
- [ ] 2.3 `openspec/specs/` を走査して仕様一覧を収集するロジックを実装する
- [ ] 2.4 トップページ（`dist-openspec/index.html`）を生成するロジックを実装する（changes・specs の一覧リンク含む）
- [ ] 2.5 各 Markdown ファイルを HTML に変換して `dist-openspec/` 以下に出力するロジックを実装する（ディレクトリ構造を保持）
- [ ] 2.6 各 HTML ページにトップページへ戻るナビゲーションリンクを追加する

## 3. package.json へのスクリプト登録

- [ ] 3.1 `package.json` の `scripts` に `"build:openspec-pages": "bun scripts/build-openspec-pages.ts"` を追加する

## 4. .gitignore の更新

- [ ] 4.1 `.gitignore` に `dist-openspec/` を追加する

## 5. GitHub Actions ワークフローの作成

- [ ] 5.1 `.github/workflows/deploy-openspec-pages.yml` を新規作成する
- [ ] 5.2 トリガーを `push: branches: [main]` に設定する
- [ ] 5.3 Bun セットアップステップ（`oven-sh/setup-bun`）を追加する
- [ ] 5.4 依存インストール（`bun install`）ステップを追加する
- [ ] 5.5 ビルドステップ（`bun run build:openspec-pages`）を追加する
- [ ] 5.6 `peaceiris/actions-gh-pages` を使って `dist-openspec/` を `gh-pages` ブランチにデプロイするステップを追加する

## 6. GitHub リポジトリの設定

- [ ] 6.1 GitHub リポジトリの Settings > Pages で Source を `gh-pages` ブランチ・`/（root）` に設定する（手動作業）
- [ ] 6.2 初回デプロイ後に公開 URL でアクセスできることを確認する
