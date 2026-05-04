## Requirements

### Requirement: コードブロックへのコピーボタン追加
記事本文の各コードブロック右上にクリップボードコピーボタンを表示する。クリックでコード全文をクリップボードにコピーし、2秒間「copied!」フィードバックを表示する。

#### Scenario: コードブロックを表示する
- **WHEN** コードブロックを含む記事を表示する
- **THEN** 各コードブロックの右上に SVG クリップボードアイコンが表示される
- **THEN** アイコンは `fill: #8f9398` で表示される

#### Scenario: コピーボタンをクリックする
- **WHEN** コードブロック右上のコピーボタンをクリックする
- **THEN** コードブロック内のテキスト全体がクリップボードにコピーされる
- **THEN** 「copied!」テキストが 2000ms 間表示される
- **THEN** 2000ms 後に「copied!」が非表示になりアイコンに戻る

#### Scenario: ボタンの DOM 挿入
- **WHEN** HTML パーサーが記事 HTML を処理する
- **THEN** 各 `<pre>` タグ内の先頭に `.clipboard` クラスの div が挿入される
- **THEN** `.clipboard` div は初期状態 `display: none` で、JavaScript 初期化後に `display: flex` になる
