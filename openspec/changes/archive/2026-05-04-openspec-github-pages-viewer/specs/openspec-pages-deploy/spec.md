## ADDED Requirements

### Requirement: main ブランチへのプッシュ時に自動デプロイする
GitHub Actions ワークフローは `main` ブランチへのプッシュをトリガーにビルドとデプロイを実行しなければならない（SHALL）。

#### Scenario: main ブランチへのプッシュ
- **WHEN** `main` ブランチに commit が push される
- **THEN** GitHub Actions ワークフローが起動し、ビルドスクリプトを実行する
- **THEN** ビルド成果物（`dist-openspec/`）が `gh-pages` ブランチにデプロイされる

#### Scenario: openspec/ 以外の変更のみの場合
- **WHEN** `openspec/` 配下のファイルに変更がないプッシュが行われる
- **THEN** ワークフローは実行されるが変更がなくデプロイが完了する（スキップは必須ではない）

### Requirement: デプロイは gh-pages ブランチへ行う
ビルド成果物は `gh-pages` ブランチに配置しなければならない（SHALL）。

#### Scenario: 初回デプロイ
- **WHEN** `gh-pages` ブランチが存在しない状態でワークフローが初回実行される
- **THEN** `gh-pages` ブランチが自動作成され成果物が push される

#### Scenario: 2回目以降のデプロイ
- **WHEN** `gh-pages` ブランチが既に存在する状態でワークフローが実行される
- **THEN** 既存の内容を新しいビルド成果物で上書きして push される

### Requirement: Bun 環境でビルドスクリプトを実行する
ワークフローは Bun をセットアップしてビルドスクリプトを実行しなければならない（SHALL）。

#### Scenario: ビルドステップの実行
- **WHEN** ワークフローのビルドステップが実行される
- **THEN** Bun がインストールされ `bun run build:openspec-pages` が呼び出される
- **THEN** `dist-openspec/` に HTML ファイルが生成される
