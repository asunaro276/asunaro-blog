## ADDED Requirements

### Requirement: 月別アーカイブ専用ヘッダー
月別アーカイブページは、年と月名を大見出しで表示し前後月へのナビゲーションを持つ専用ヘッダーを持つ SHALL。

#### Scenario: 月別アーカイブページを表示する
- **WHEN** `/yearmonth/[yearmonth]/[page]` のページを表示する
- **THEN** パンくず「← ARCHIVE / Monthly」が表示される
- **THEN** 年が `--accent` 色のモノスペース 14px で表示される
- **THEN** 月名（January〜December の英語表記）が 64px の太字見出しで表示される
- **THEN** 「この月に書いた N 件の記事」が表示される

### Requirement: 前後月ナビゲーション
ヘッダーに前月・次月へのリンクボタンを表示する SHALL。

#### Scenario: 前後月ボタンが表示される
- **WHEN** 月別アーカイブページを表示する
- **THEN** 「← YYYY.MM」（前月）と「YYYY.MM →」（次月）のボタンが表示される
- **THEN** 前月・次月の対応する `/yearmonth/[yearmonth]/1` へリンクする

### Requirement: 年ストリップ
ヘッダーに当該年の全 12ヶ月を横並びチップで表示し、現在の月をアクティブスタイルで示す SHALL。

#### Scenario: 年ストリップが表示される
- **WHEN** 月別アーカイブページを表示する
- **THEN** 当該年のラベルとともに Jan〜Dec の 12チップが横一列に表示される
- **THEN** 現在表示中の月チップは `background: var(--accent); color: var(--bg)` でハイライトされる
- **THEN** 投稿のある月チップは `background: var(--bg-3)` で薄くハイライトされる
- **THEN** 各チップは対応する月のアーカイブページへリンクする
