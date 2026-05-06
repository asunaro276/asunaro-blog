## ADDED Requirements

### Requirement: Design System セクションを生成する
ビルドスクリプトはリポジトリルートの `DESIGN.md` をパースし、`dist-openspec/design/index.html` を生成しなければならない（SHALL）。

#### Scenario: DESIGN.md が存在する場合
- **WHEN** リポジトリルートに `DESIGN.md` が存在する状態でビルドを実行する
- **THEN** `dist-openspec/design/index.html` が生成される

#### Scenario: DESIGN.md が存在しない場合
- **WHEN** リポジトリルートに `DESIGN.md` が存在しない状態でビルドを実行する
- **THEN** `dist-openspec/design/index.html` は生成されない
- **THEN** ビルドはエラーなく完了する

### Requirement: カラーパレットをスウォッチ付きテーブルで表示する
Design System ページは `DESIGN.md` フロントマターの `colors` オブジェクトをカラースウォッチ付きのテーブルとして表示しなければならない（SHALL）。

#### Scenario: カラーテーブルの表示
- **WHEN** `design/index.html` を表示する
- **THEN** Colors セクションに各トークンのスウォッチ（色付き正方形）・CSS 変数名（`--fg` 等）・Light の hex 値・Dark の hex 値・用途が表示される

### Requirement: タイポグラフィをフォントプレビュー付きで表示する
Design System ページは `DESIGN.md` フロントマターの `typography` オブジェクトを実フォントで描画したプレビューとともに表示しなければならない（SHALL）。

#### Scenario: タイポグラフィプレビューの表示
- **WHEN** `design/index.html` を表示する
- **THEN** Typography セクションに各タイポグラフィトークンのフォント名・サイズ・ウェイトと、そのスタイルを実際に適用したプレビューテキストが表示される

### Requirement: スペーシングをバー表示で可視化する
Design System ページは `DESIGN.md` フロントマターの `spacing` オブジェクトを横バーの長さで視覚的に表示しなければならない（SHALL）。

#### Scenario: スペーシングバーの表示
- **WHEN** `design/index.html` を表示する
- **THEN** Spacing セクションに各トークン（`--space-xs` 〜 `--space-3xl`）の CSS 変数名・px 値・その値に対応する幅のカラーバーが表示される

### Requirement: 角丸をボックスデモで可視化する
Design System ページは `DESIGN.md` フロントマターの `rounded` オブジェクトを角丸ボックスで視覚的に表示しなければならない（SHALL）。

#### Scenario: 角丸ボックスの表示
- **WHEN** `design/index.html` を表示する
- **THEN** Border Radius セクションに各トークン（`--rounded-sm` 〜 `--rounded-full`）の CSS 変数名・px 値・そのトークンを適用した正方形ボックスが表示される
