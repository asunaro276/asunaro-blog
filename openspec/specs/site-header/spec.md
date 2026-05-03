## ADDED Requirements

### Requirement: スティッキー blur ヘッダー
ヘッダーはスクロールしても画面上部に固定（sticky）され、背景は `backdrop-filter: blur(14px)` + `--bg` の半透明色で表示する。下部に `1px solid var(--rule)` のボーダーを持つ。

#### Scenario: ページをスクロールする
- **WHEN** ユーザーがページを下方向にスクロールする
- **THEN** ヘッダーは画面上部に固定されたまま表示される
- **THEN** ヘッダー背景はコンテンツ上で半透明 + blur で表示される

### Requirement: 3カラムヘッダーレイアウト
ヘッダー内部は `grid-template-columns: 1fr auto 1fr` の3カラムグリッドで構成する。左にロゴ、中央にナビゲーション、右に検索/RSS リンクを配置する。

#### Scenario: デスクトップでヘッダーを表示する
- **WHEN** ビューポート幅が 1024px 以上
- **THEN** ロゴ・ナビ・検索/RSS が横並びの3カラムで表示される

### Requirement: ロゴ表示
ロゴは `asunaro` + `blog`（accent カラー）のインラインテキストで表示する。`font-weight: 600`, `font-size: 20px`, `letter-spacing: -0.02em`。`since 2022` をモノスペースで小さく添える。

#### Scenario: ロゴが表示される
- **WHEN** ヘッダーが表示される
- **THEN** "asunaro" は `--fg` 色、"blog" は `--accent` 色で表示される
- **THEN** ロゴはトップページへのリンクになっている

### Requirement: ナビゲーションメニュー
HOME / CODE / BUSINESS / MATH / OTHER の5項目を横並びで表示する。アクティブなページの項目は `--fg` 色 + `--accent` 色のボーダーボトムで強調する。

#### Scenario: 現在のページのナビが強調される
- **WHEN** CODE カテゴリページを表示している
- **THEN** CODE ナビ項目が `--fg` 色と `--accent` ボーダーボトムで強調される
- **THEN** 他の項目は `--fg-2` 色で表示される
