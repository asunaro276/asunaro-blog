## ADDED Requirements

### Requirement: PRごとにLighthouse CIが自動実行される
GitHub Actionsワークフローは、Cloudflare Pagesへのデプロイ完了後にLighthouse CIをプレビューURLに対して実行しなければならない（SHALL）。

#### Scenario: デプロイ成功後にLighthouse CIが起動する
- **WHEN** Cloudflare Pagesへのデプロイが成功しプレビューURLが取得できる
- **THEN** `@lhci/cli` がそのプレビューURLに対してLighthouseを実行する

#### Scenario: 計測は複数回実行されメジアン値を使用する
- **WHEN** Lighthouse CIが実行される
- **THEN** 同一URLに対して3回計測が行われ、メジアン値がレポートに使用される

### Requirement: 単一ページ計測はトップページと代表記事ページの2URLとする
`lhci autorun` による単一ページ計測はトップページおよび代表的な記事ページのURLを対象としなければならない（SHALL）。

#### Scenario: トップページが計測される
- **WHEN** Lighthouse CIが実行される
- **THEN** `{PREVIEW_URL}/` のLighthouseレポートが生成される

#### Scenario: 記事ページが計測される
- **WHEN** Lighthouse CIが実行される
- **THEN** `{PREVIEW_URL}/blog/{ARTICLE_SLUG}/` のLighthouseレポートが生成される

### Requirement: User Flowsによるページ遷移計測を行う
View Transitionsを経由した画面遷移のパフォーマンスをLighthouse User Flowsで計測しなければならない（SHALL）。

#### Scenario: 記事一覧から詳細ページへの遷移が計測される
- **WHEN** User Flowsスクリプトが実行される
- **THEN** トップページの初期ロード（navigation step）が記録される
- **THEN** 記事カードへのクリック操作（timespan step）が記録される
- **THEN** 記事詳細ページへのView Transitions遷移完了後のスナップショット（snapshot step）が記録される
- **THEN** 一連のフローレポートが生成される

#### Scenario: User Flowsのレポートがアップロードされる
- **WHEN** User Flowsスクリプトの実行が完了する
- **THEN** フローレポートがHTMLファイルとして出力され、GitHub ActionsのArtifactsとしてアップロードされる

### Requirement: Lighthouseスコアのレポートがアップロードされる
Lighthouse CIの計測結果はLHCI公開ストレージにアップロードされ、レポートURLがGitHub Actionsのログから確認できなければならない（SHALL）。

#### Scenario: レポートがLHCI公開ストレージに保存される
- **WHEN** Lighthouse CIの計測が完了する
- **THEN** レポートが `temporary-public-storage` にアップロードされる
- **THEN** レポートURLがActionsのログに出力される

### Requirement: パフォーマンス目標値をLighthouse CIアサーションで管理する
`lighthouserc.json` にパフォーマンス目標値をアサーションとして定義しなければならない（SHALL）。目標値はベースライン計測後に調整される。

#### Scenario: Performance Scoreが目標値を下回った場合に警告が出る
- **WHEN** LighthouseのPerformance Scoreが90未満である
- **THEN** Lighthouse CIがアサーション違反として警告を出力する

#### Scenario: LCPが目標値を超えた場合に警告が出る
- **WHEN** LCPが2,500msを超える
- **THEN** Lighthouse CIがアサーション違反として警告を出力する

#### Scenario: TBTが目標値を超えた場合に警告が出る
- **WHEN** TBTが200msを超える
- **THEN** Lighthouse CIがアサーション違反として警告を出力する

#### Scenario: CLSが目標値を超えた場合に警告が出る
- **WHEN** CLSが0.1を超える
- **THEN** Lighthouse CIがアサーション違反として警告を出力する
