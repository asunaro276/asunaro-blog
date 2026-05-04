## Requirements

### Requirement: SVG Primary Favicon（ヒノキの枝シルエット）
ファビコンは候補C「ヒノキの枝シルエット」デザインの SVG を primary とし、`<link rel="icon" type="image/svg+xml">` で指定する。

#### Scenario: ブラウザタブにファビコンが表示される
- **WHEN** モダンブラウザでサイトを表示する
- **THEN** ブラウザタブに SVG ファビコン（64×64 viewBox、角丸矩形背景 + 枝シルエット）が表示される
- **THEN** `public/favicons/favicon.svg` が primary favicon として `Layout.astro` の `<head>` に登録されている

### Requirement: ダークモード対応 SVG
SVG ファビコンは CSS メディアクエリでダークモード時の配色に切り替わる。

#### Scenario: ダークモードでファビコンを表示する
- **WHEN** OS のカラースキームが dark の場合
- **THEN** ファビコン背景色が `#1a1f1c`、枝シルエット色が `#6cb47a` に切り替わる
- **WHEN** OS のカラースキームが light の場合
- **THEN** ファビコン背景色が `#f4f3ef`、枝シルエット色が `#2f6b3f` で表示される

### Requirement: PNG フォールバックと各種アイコン
SVG 非対応環境向けに PNG フォールバックを提供する。Apple・Android・Windows 向けの各サイズを用意する。

#### Scenario: PNG ファビコンが各サイズで提供される
- **WHEN** `public/favicons/` ディレクトリを確認する
- **THEN** `favicon-16x16.png`・`favicon-32x32.png` が存在する
- **THEN** `apple-touch-icon.png`（180×180）・`android-chrome-192x192.png`・`android-chrome-384x384.png`・`mstile-150x150.png` が存在する
- **THEN** `favicon.ico`（16px + 32px を含む ICO）が存在する

### Requirement: Safari ピンタブ用マスク SVG
Safari の Pinned Tab 向けに単色マスク SVG を提供する。

#### Scenario: safari-pinned-tab.svg が存在する
- **WHEN** `public/favicons/safari-pinned-tab.svg` を確認する
- **THEN** ヒノキの枝パスが `fill="#2f6b3f"` の単色で定義されている（背景矩形なし）
