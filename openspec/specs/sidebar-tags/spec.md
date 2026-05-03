## ADDED Requirements

### Requirement: タグチップ型サイドバー
サイドバーのタグセクションは、タグ名と記事数をチップ（丸角ボーダー）で表示する。

#### Scenario: タグセクションが表示される
- **WHEN** サイドバーのタグセクションを表示する
- **THEN** "Tags" ラベルが上部に表示される
- **THEN** 各タグが `border: 1px solid var(--rule-2)` の丸角チップで表示される
- **THEN** 記事数が `JetBrains Mono` `--fg-3` 色でチップ内に表示される
- **THEN** タグをクリックするとそのタグの記事一覧ページに遷移する
