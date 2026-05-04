## Requirements

### Requirement: テーマトグルボタン
ヘッダー右端にダーク/ライトテーマを切り替えるボタンを設ける。現在のテーマに応じたアイコンを表示し、クリックでトグルする。選択状態は localStorage に永続化する。

#### Scenario: ページ初回表示時にテーマが復元される
- **WHEN** ページを表示する
- **THEN** localStorage の `theme` 値（`"dark"` / `"light"`）に基づいて `<html>` に `theme-dark` または `theme-light` クラスが適用される
- **THEN** localStorage に値がない場合は `prefers-color-scheme` メディアクエリに従う

#### Scenario: トグルボタンのアイコン表示
- **WHEN** ライトモードでヘッダーを表示する
- **THEN** ボタンに `☀` アイコンが表示される
- **WHEN** ダークモードでヘッダーを表示する
- **THEN** ボタンに `🌙` アイコンが表示される

#### Scenario: テーマを切り替える
- **WHEN** テーマトグルボタンをクリックする
- **THEN** `<html>` の `theme-dark` / `theme-light` クラスがトグルされる
- **THEN** localStorage の `theme` 値が更新される
- **THEN** アイコンが切り替え後のテーマに対応するものに変わる

#### Scenario: トグルボタンの外観
- **WHEN** ヘッダーを表示する
- **THEN** ボタンは `border: 1px solid var(--rule-2)` の 32×32px 角丸ボタンで表示される
- **THEN** ボタンは `transition:persist` でページ遷移後も状態を保持する
