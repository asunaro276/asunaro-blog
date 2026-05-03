## ADDED Requirements

### Requirement: タグページ専用ヘッダー
タグ一覧ページは、タグ名を `#TagName` 形式の大見出しで表示する専用ヘッダーを持つ SHALL。

#### Scenario: タグページを表示する
- **WHEN** `/tag/[tag]/[page]` のページを表示する
- **THEN** パンくず「← TAGS / Tag」が表示される
- **THEN** `#` がアクセント色（`--accent`）、タグ名が 52px のセリフ体見出しで表示される
- **THEN** 記事数（N entries）と最終投稿日が右端に表示される

### Requirement: 関連タグチップの表示
タグページのヘッダーに全タグのチップ一覧を表示し、現在のタグをアクティブスタイルで強調する SHALL。

#### Scenario: 関連タグチップが表示される
- **WHEN** タグページのヘッダーを表示する
- **THEN** 「Related tags」ラベルとともにタグチップ一覧が表示される
- **THEN** 現在表示中のタグは `background: var(--fg); color: var(--bg)` でハイライトされる
- **THEN** その他のタグは border スタイルのチップとして表示される

#### Scenario: タグチップをクリックする
- **WHEN** 別のタグチップをクリックする
- **THEN** そのタグの一覧ページ（`/tag/[tag]/1`）に遷移する
