## ADDED Requirements

### Requirement: PRブランチをCloudflare Pagesにデプロイできる
GitHub Actionsワークフローは、PRが作成・更新されたとき `dist/` ディレクトリをCloudflare PagesにデプロイしてプレビューURLを発行しなければならない（SHALL）。

#### Scenario: PRブランチへのpushでデプロイが実行される
- **WHEN** PRに対してコミットがpushされる
- **THEN** GitHub Actionsがビルドを実行し、`dist/` をCloudflare Pagesにデプロイする
- **THEN** デプロイ後のプレビューURLが後続ステップで利用可能になる

#### Scenario: ビルドが失敗した場合はデプロイしない
- **WHEN** `bun run build` が非ゼロの終了コードで終了する
- **THEN** Cloudflare Pagesへのデプロイステップは実行されない

### Requirement: mainブランチへのpushではproductionにデプロイする
mainブランチにコミットがpushされたとき、GitHub ActionsはCloudflare PagesのproductionへデプロイしなければならないS（SHALL）。

#### Scenario: mainへのpushでproductionデプロイが実行される
- **WHEN** コミットがmainブランチにpushされる
- **THEN** GitHub ActionsがビルドをおよびCloudflare PagesへのproductionデプロイをWrangler CLI経由で実行する

### Requirement: デプロイに必要なシークレットをGitHub Secretsで管理する
`CLOUDFLARE_API_TOKEN` および `CLOUDFLARE_ACCOUNT_ID` はGitHub Secretsに保存されなければならない（SHALL）。

#### Scenario: シークレットが未設定の場合はデプロイが失敗する
- **WHEN** `CLOUDFLARE_API_TOKEN` または `CLOUDFLARE_ACCOUNT_ID` がSecretsに存在しない
- **THEN** ワークフローのデプロイステップがエラーで終了する
