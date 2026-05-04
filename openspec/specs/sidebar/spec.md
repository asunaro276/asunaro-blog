## Requirements

### Requirement: サイドバーコンテナ構造
サイドバーはプロフィール・タグ・アーカイブヒートマップの3セクションを縦積みで構成する。各セクションは `border-top: 1px solid var(--rule)` で区切られる。

#### Scenario: デスクトップでサイドバーを表示する
- **WHEN** 記事一覧・カテゴリ・タグ・月別アーカイブページをデスクトップで表示する
- **THEN** サイドバーに `border-left: 1px solid var(--rule)` と `padding-left: 36px` が適用される
- **THEN** プロフィールセクション → タグセクション（border-top）→ アーカイブセクション（border-top）の順で縦積みになる

#### Scenario: モバイルでサイドバーを表示する
- **WHEN** 1024px 未満でページを表示する
- **THEN** サイドバーの `border-left` が消え、`border-top: 1px solid var(--rule)` に切り替わる
- **THEN** `padding-left: 0`・`padding-top: 32px` が適用される

### Requirement: ページタイプ別サイドバー表示
サイドバーはすべての一覧系ページ（トップ・カテゴリ・タグ・月別アーカイブ）で表示される。記事詳細ページには表示されない（記事詳細は PostBody の右カラムに ToC を表示）。

#### Scenario: 一覧ページでサイドバーが表示される
- **WHEN** トップページ・カテゴリ・タグ・月別アーカイブページを表示する
- **THEN** プロフィール・タグ・アーカイブヒートマップを含むサイドバーが右カラムに表示される

#### Scenario: 記事詳細ページにはサイドバーがない
- **WHEN** 記事詳細ページを表示する
- **THEN** サイドバーは表示されない（PostBody の右カラムに ToC が表示される）
