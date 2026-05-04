## ADDED Requirements

### Requirement: DESIGN.md ファイルの存在と仕様準拠
プロジェクトルートに `DESIGN.md` ファイルが存在し、Google Stitch 公式仕様に準拠した YAML フロントマター（機械可読トークン）と Markdown ボディ（人間可読設計解説）の2層構造を持つ。

#### Scenario: YAML フロントマターが存在する
- **WHEN** `DESIGN.md` の先頭を確認する
- **THEN** `---` で囲まれた YAML フロントマターブロックが存在する
- **THEN** `version: alpha` と `name: asunaroblog` が含まれる

#### Scenario: カラートークンが hex 形式で定義されている
- **WHEN** `DESIGN.md` の `colors` セクションを確認する
- **THEN** `primary`, `secondary`, `surface`, `accent` 以上のトークンが定義されている
- **THEN** すべてのカラー値が `"#RRGGBB"` 形式である

#### Scenario: タイポグラフィトークンが定義されている
- **WHEN** `DESIGN.md` の `typography` セクションを確認する
- **THEN** `headline-display`, `body-md`, `label-caps` 以上のトークンが定義されている
- **THEN** 各トークンに `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` が含まれる

#### Scenario: スペーシングと角丸トークンが定義されている
- **WHEN** `DESIGN.md` の `spacing` および `rounded` セクションを確認する
- **THEN** `spacing` に `xs`, `sm`, `md`, `lg`, `xl` 以上のスケールが存在する
- **THEN** `rounded` に `sm`, `md`, `lg`, `full` のスケールが存在する

#### Scenario: コンポーネントトークンがトークン参照を使用している
- **WHEN** `DESIGN.md` の `components` セクションを確認する
- **THEN** `post-card`, `tab-active`, `tab-inactive` 以上のコンポーネントが定義されている
- **THEN** 各プロパティが `{colors.xxx}` や `{spacing.xxx}` 形式のトークン参照を使用している

### Requirement: DESIGN.md の Markdown ボディ構成
Markdown ボディは公式仕様のセクション順序に従って構成される。

#### Scenario: 必須セクションが正しい順序で存在する
- **WHEN** `DESIGN.md` のボディを確認する
- **THEN** `## Overview`, `## Colors`, `## Typography`, `## Layout`, `## Elevation & Depth`, `## Shapes`, `## Components`, `## Do's and Don'ts` が順番に存在する

#### Scenario: CSS 変数との対応テーブルが存在する
- **WHEN** `DESIGN.md` の `## Colors` セクションを確認する
- **THEN** DESIGN.md トークン名（`primary` 等）と CSS カスタムプロパティ名（`--fg` 等）の対応テーブルが記載されている

### Requirement: CLAUDE.md からの DESIGN.md 参照
`CLAUDE.md` に、コンポーネント実装時は `DESIGN.md` を参照するよう指示が追記されている。

#### Scenario: CLAUDE.md に DESIGN.md への参照が存在する
- **WHEN** `CLAUDE.md` を確認する
- **THEN** `DESIGN.md` を参照するよう明示した記述が存在する
