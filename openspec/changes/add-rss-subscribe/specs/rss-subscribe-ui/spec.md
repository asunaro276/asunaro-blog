## ADDED Requirements

### Requirement: サイドバーに RSS 購読ボタンを表示する
SideProfile コンポーネントは RSS フィードへのリンクボタンを表示しなければならない（SHALL）。ボタンは RSS SVG アイコンとラベル「RSS」を含み、フォレストリブランドのデザイントークン（`--accent`, `--fg-2`）を使用してスタイリングされなければならない（SHALL）。

#### Scenario: サイドバーの購読ボタンが表示される
- **WHEN** サイドバーを含むページを表示する
- **THEN** SideProfile 内に `/rss.xml` へのリンクを持つ RSS ボタンが表示される

#### Scenario: ボタンがデザイントークンに準拠する
- **WHEN** ライトモードまたはダークモードでページを表示する
- **THEN** RSS ボタンのアイコン色は `--accent` カスタムプロパティ値を使用し、テーマに追従する

### Requirement: フッターの Elsewhere セクションに RSS リンクを追加する
フッターの Elsewhere セクションは GitHub・X リンクと並んで RSS フィードリンクを表示しなければならない（SHALL）。

#### Scenario: フッターに RSS リンクが表示される
- **WHEN** フッターを含むページを表示する
- **THEN** Elsewhere セクションに `href="/rss.xml"` を持つ「RSS ↗」リンクが表示される

#### Scenario: リンクのスタイルが既存リンクと一貫する
- **WHEN** フッターを表示する
- **THEN** RSS リンクは GitHub・X リンクと同一のフォントサイズ・色（`--fg-2`）・スタイルで表示される
