## ADDED Requirements

### Requirement: tokens.scss ファイルの存在
`src/presentation/styles/tokens.scss` が存在し、カラー・スペーシング・角丸の CSS カスタムプロパティを一元管理する。

#### Scenario: tokens.scss ファイルが存在する
- **WHEN** `src/presentation/styles/` を確認する
- **THEN** `tokens.scss` ファイルが存在する

### Requirement: スペーシングトークンの定義
`tokens.scss` の `:root, .theme-light` セレクタに、スペーシングスケールの CSS カスタムプロパティが定義されている。

#### Scenario: スペーシング変数が定義されている
- **WHEN** `tokens.scss` を確認する
- **THEN** `--space-xs: 4px`, `--space-sm: 8px`, `--space-md: 16px`, `--space-lg: 24px`, `--space-xl: 32px`, `--space-2xl: 48px`, `--space-3xl: 64px` が定義されている

### Requirement: 角丸トークンの定義
`tokens.scss` に角丸スケールの CSS カスタムプロパティが定義されている。

#### Scenario: 角丸変数が定義されている
- **WHEN** `tokens.scss` を確認する
- **THEN** `--rounded-sm: 4px`, `--rounded-md: 8px`, `--rounded-lg: 12px`, `--rounded-full: 9999px` が定義されている

### Requirement: globals.scss から tokens.scss の参照
`globals.scss` はカラー変数の定義を持たず、`tokens.scss` を `@use` でインポートする。

#### Scenario: globals.scss が tokens.scss をインポートしている
- **WHEN** `globals.scss` を確認する
- **THEN** `@use 'tokens'` または `@use './tokens'` の記述が存在する
- **THEN** カラー変数（`--bg`, `--fg` 等）の定義が `globals.scss` に直接書かれていない
