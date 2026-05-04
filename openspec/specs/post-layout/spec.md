## ADDED Requirements

### Requirement: 3カラム記事詳細レイアウト
記事詳細ページの本文エリアを `180px 1fr 220px` の3カラムグリッドで構成する。左カラムにタグ+シェア、中央カラムに本文、右カラムに目次を配置する。

#### Scenario: デスクトップで記事詳細を表示する
- **WHEN** 記事詳細ページをデスクトップ（1024px 以上）で表示する
- **THEN** 左カラム（タグ+シェア）・中央（本文）・右（TOC）の3カラムが表示される
- **THEN** 左カラムと右カラムは `position: sticky; top: 80px` でスクロール時に固定される

#### Scenario: モバイルで記事詳細を表示する
- **WHEN** 記事詳細ページをモバイル（768px 未満）で表示する
- **THEN** 1カラムレイアウトに折りたたまれる
- **THEN** タグは本文上部に表示される

### Requirement: 記事ヘッダー（センタリング）
記事タイトル・カテゴリ・日付・読了時間・説明文は中央揃えで表示する。タイトルは `Noto Serif JP` 48px。

#### Scenario: 記事ヘッダーが表示される
- **WHEN** 記事詳細ページを表示する
- **THEN** カテゴリ・日付・読了時間が `--accent` 色のラベルで表示される
- **THEN** タイトルが中央揃えで 48px 表示される
- **THEN** 説明文が中央揃えで `--fg-2` 色で表示される

### Requirement: 本文のタイポグラフィ
本文は `Noto Sans JP` 16px・`line-height: 2.05` で表示する。H2 見出しは `Noto Serif JP` 24px。引用は左ボーダー（2px `--accent`）付きで表示する。

#### Scenario: 本文の各要素が表示される
- **WHEN** 記事詳細ページの本文エリアを表示する
- **THEN** H2 見出しは `Noto Serif JP` 24px で表示される
- **THEN** 引用（blockquote）は `border-left: 2px solid var(--accent)` で表示される

### Requirement: Suggested Posts セクション
記事詳細の最下部に「Suggested for you」として関連記事 3件を表示する。

#### Scenario: Suggested Posts が表示される
- **WHEN** 記事詳細ページの最下部を表示する
- **THEN** "Suggested for you" セクションが `border-top` で区切られて表示される
- **THEN** 関連記事が 3カラムの記事カードで表示される

### Requirement: ToC 階層表示（Variant A: Indent）
記事詳細ページの目次（ToC）は、h2/h3/h4 の見出し階層をインデント・フォントサイズ・左ボーダーで視覚的に区別して表示する SHALL。

#### Scenario: ToC に階層が表示される
- **WHEN** h2/h3/h4 が混在する記事の詳細ページを表示する
- **THEN** h2 の目次項目は左インデント 0px・フォントサイズ 13px・font-weight 500 で表示される
- **THEN** h3 の目次項目は左インデント 14px・フォントサイズ 12px・font-weight 400 で表示される
- **THEN** h4 の目次項目は左インデント 28px・フォントサイズ 11.5px・font-weight 400 で表示される
- **THEN** アクティブな項目は `border-left: 2px solid var(--accent)` と `color: var(--fg)` で強調される
- **THEN** 非アクティブな h2 は `color: var(--fg-2)`、h3/h4 は `color: var(--fg-3)` で表示される
