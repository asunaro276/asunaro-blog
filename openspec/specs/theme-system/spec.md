## ADDED Requirements

### Requirement: CSS custom properties によるテーマ変数の定義
サイト全体の色・背景・ルール色・アクセント色を CSS custom properties で定義する。変数は `--bg`, `--bg-2`, `--bg-3`, `--fg`, `--fg-2`, `--fg-3`, `--rule`, `--rule-2`, `--accent`, `--tint` の10変数とし、oklch 色空間で指定する。変数の定義場所は `globals.scss` から `tokens.scss` に移動する。

#### Scenario: Light テーマの変数が適用される
- **WHEN** `<html>` 要素が `theme-light` クラスを持つ
- **THEN** `--bg` は暖かみのある白（oklch(0.985 0.008 110)）が適用される
- **THEN** `--accent` は Forest Green（oklch(0.46 0.09 155)）が適用される

#### Scenario: Dark テーマの変数が適用される
- **WHEN** `<html>` 要素が `theme-dark` クラスを持つ
- **THEN** `--bg` は深い森緑がかった黒（oklch(0.17 0.012 150)）が適用される
- **THEN** `--accent` は Sage（oklch(0.78 0.10 145)）が適用される

#### Scenario: カラー変数が tokens.scss で定義されている
- **WHEN** `src/presentation/styles/tokens.scss` を確認する
- **THEN** `:root, .theme-light` と `.theme-dark` のカラー変数定義が存在する
- **THEN** `globals.scss` にはカラー変数の直接定義が存在しない
