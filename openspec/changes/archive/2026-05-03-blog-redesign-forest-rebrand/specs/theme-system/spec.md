## ADDED Requirements

### Requirement: CSS custom properties によるテーマ変数の定義
サイト全体の色・背景・ルール色・アクセント色を `globals.scss` の CSS custom properties で定義する。変数は `--bg`, `--bg-2`, `--bg-3`, `--fg`, `--fg-2`, `--fg-3`, `--rule`, `--rule-2`, `--accent`, `--tint` の10変数とし、oklch 色空間で指定する。

#### Scenario: Light テーマの変数が適用される
- **WHEN** `<html>` 要素が `theme-light` クラスを持つ
- **THEN** `--bg` は暖かみのある白（oklch(0.985 0.008 110)）が適用される
- **THEN** `--accent` は Forest Green（oklch(0.46 0.09 155)）が適用される

#### Scenario: Dark テーマの変数が適用される
- **WHEN** `<html>` 要素が `theme-dark` クラスを持つ
- **THEN** `--bg` は深い森緑がかった黒（oklch(0.17 0.012 150)）が適用される
- **THEN** `--accent` は Sage（oklch(0.78 0.10 145)）が適用される

### Requirement: テーマの初期化
ページ読み込み時にシステムの `prefers-color-scheme` を参照し、`<html>` に適切なテーマクラスを付与する。`localStorage` に保存された設定がある場合はそれを優先する。

#### Scenario: システム設定 Dark のユーザーが初回訪問する
- **WHEN** `prefers-color-scheme: dark` で `localStorage` に設定なし
- **THEN** `<html>` に `theme-dark` クラスが付与される

#### Scenario: ユーザーが以前 Light を選択していた
- **WHEN** `localStorage.theme === 'light'`
- **THEN** システム設定に関わらず `theme-light` クラスが付与される

### Requirement: テーマトグル
ヘッダーにテーマ切替ボタンを配置し、クリックでテーマを切り替える。選択は `localStorage` に保存する。

#### Scenario: ユーザーがテーマトグルをクリックする
- **WHEN** Light テーマ中にトグルボタンをクリック
- **THEN** `<html>` のクラスが `theme-dark` に変わる
- **THEN** `localStorage.theme` に `'dark'` が保存される
