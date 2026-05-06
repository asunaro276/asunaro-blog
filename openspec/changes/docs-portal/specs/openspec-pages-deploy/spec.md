## ADDED Requirements

### Requirement: カスタムドメイン `specs.asunaroblog.net` を設定する
デプロイワークフローは `specs.asunaroblog.net` を GitHub Pages のカスタムドメインとして設定するための CNAME ファイルを `gh-pages` ブランチに含めなければならない（SHALL）。

#### Scenario: CNAME ファイルのデプロイ
- **WHEN** GitHub Actions ワークフローが `gh-pages` ブランチへデプロイを実行する
- **THEN** `gh-pages` ブランチのルートに `CNAME` ファイルが存在する
- **THEN** `CNAME` ファイルの内容が `specs.asunaroblog.net` である

#### Scenario: カスタムドメインでのアクセス
- **WHEN** DNS 設定と GitHub Pages のカスタムドメイン設定が完了した状態で `https://specs.asunaroblog.net` にアクセスする
- **THEN** ドキュメントポータルのトップページが表示される
