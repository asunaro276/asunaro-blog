## Context

プロトタイプ（`asunaroblog (1).zip`）で定義された5つのデザイン変更を実装する。現行の実装はリブランド後のカラーパレットとレイアウトは適用済みだが、Favicon・フォント・タグ/月別アーカイブのヘッダー・ToC 階層表示の4点が旧状態のまま。

### 現行状態

| 対象 | 現状 | 目標 |
|------|------|------|
| Favicon | 汎用グリーン正方形 | 候補C「ヒノキの枝シルエット」 |
| `font-serif-jp` | `Noto Serif JP, serif` | `Inter, Noto Sans JP, sans-serif` （`data-headline="sans"` 相当） |
| タグ一覧ページヘッダー | 単行テキスト「{tag}に関する記事一覧」 | `#TagName` 大見出し + 記事数 + 関連タグチップ + パンくず |
| 月別アーカイブヘッダー | 単行テキスト「YYYY年M月の記事一覧」 | 年・月名の大見出し + 年ストリップ + 前後月ナビ + タイムライン記事リスト |
| ToC | フラット（全項目同一スタイル） | Variant A: インデント+サイズ+左ボーダーで h2/h3/h4 を区別 |

## Goals / Non-Goals

**Goals:**
- Favicon を候補C SVG パスに差し替え、16px〜180px の全スケールで読める状態にする
- `font-serif-jp` フォントスタックを `Inter, Noto Sans JP` に変更してプロトタイプのデフォルト見出しスタイルと一致させる
- タグ一覧ページに専用ヘッダーコンポーネント `TagHeader` を実装する
- 月別アーカイブページに専用ヘッダーコンポーネント `YearMonthHeader` と、タイムライン形式の記事リスト `YearMonthArticleList` を実装する
- ToC に h2/h3/h4 の深さに応じたインデント・フォントサイズ変化・左ボーダー強調を実装する

**Non-Goals:**
- ダークモード対応（既存テーマシステムに乗るため個別対応不要）
- Favicon PNG の自動生成スクリプト（SVG を元に手動または既存ツールで生成）
- カテゴリ一覧ページのヘッダー変更（`CategoryHeader` は既に実装済み）
- `font-serif-jp` の使用箇所以外（記事本文・引用等）のタイポグラフィ変更

## Decisions

### 1. Favicon: SVG primary + PNG fallback

**決定**: `favicon.svg` を primary として `<link rel="icon" type="image/svg+xml">` で指定し、`favicon-32x32.png` / `favicon-16x16.png` は SVG から生成した PNG で上書きする。`safari-pinned-tab.svg` は単色 mask 用に同じパスデータを使用。

**理由**: 現代ブラウザは SVG favicon を優先するため、まず SVG を置けば高解像度で表示できる。PNG fallback は ICO に内包するため旧ブラウザも対応。`apple-touch-icon.png` / `android-chrome-*.png` は 180px・192px・384px の PNG を生成。

**代替案**: ICO ファイルのみ差し替え → 解像度が16/32pxに限定される、SVG が使えるモダン環境で粗く見える。

**SVG パスデータ（候補C）**:
```xml
<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="14" fill="#f4f3ef"/>
  <g fill="#2f6b3f">
    <path d="M32 8 L26 18 L32 16 L38 18 Z"/>
    <path d="M32 18 L20 28 L28 26 L32 28 L36 26 L44 28 Z"/>
    <path d="M32 28 L16 40 L26 36 L32 40 L38 36 L48 40 Z"/>
    <rect x="30" y="38" width="4" height="14" rx="1.5"/>
  </g>
</svg>
```

ダークモード対応として `<svg>` に `@media (prefers-color-scheme: dark)` を使い、背景 `#1a1f1c`・前景 `#6cb47a` に切り替える（SVG favicon は CSS メディアクエリをサポート）。

### 2. フォント変更: font-serif-jp を Inter/Noto Sans JP に

**決定**: `globals.scss` の `.font-serif-jp` を `'Inter', 'Noto Sans JP', sans-serif` に変更し、`letter-spacing: -0.025em` を追加する。

**理由**: プロトタイプのデフォルト見出しスタイル `data-headline="sans"` と一致させる。`Noto Serif JP` は本文・引用・インラインでは現在使われておらず、`.font-serif-jp` クラスのみで参照されているため影響範囲が限定的。

**代替案**: `data-headline` 属性をページ全体に付与 → テーマシステムを大きく変更する必要がある。フォントクラス変更の方が最小変更で済む。

### 3. TagHeader・YearMonthHeader を新コンポーネントとして追加

**決定**: `src/presentation/components/common/TagHeader/index.astro` と `src/presentation/components/common/YearMonthHeader/index.astro` を新設し、`HomePage/index.astro` で分岐表示する。`YearMonthArticleList/index.astro` もタイムライン専用コンポーネントとして追加。

**理由**: `CategoryHeader` と同じ構造で追加することで統一性を保てる。`HomePage/index.astro` の分岐は `category` / `tag` / `yearmonth` props が既に存在するため影響が少ない。

**代替案**: `CategoryHeader` を汎用 `PageHeader` に拡張 → 既存テストやスナップショットへの影響が大きい。

### 4. ToC 階層表示: htmlTag から level を導出

**決定**: `Heading` ドメインモデルには `level` フィールドを追加しない。`TableOfContents` コンポーネント内で `parseInt(item.htmlTag.replace('h', '')) || 2` として level を導出し、インデント計算に使用する。

**理由**: `htmlTag` が "h2"/"h3"/"h4" のいずれかであることは既存の HTML パーサーが保証している。`Heading` ドメインモデルへの変更は他コンポーネントへの影響が大きい。インデント幅: `(level - 2) * 14px`、フォントサイズ: h2=13px, h3=12px, h4=11.5px。

**代替案**: `Heading` に `level: number` を追加 → より正規化された設計だが本変更のスコープを超える。

## Risks / Trade-offs

- **フォント変更の視覚的影響**: `font-serif-jp` は記事タイトル・カテゴリヘッダー・セクション見出しに使われている。セリフ体からサンセリフ体への変更は日本語見出しの印象を大きく変える。 → デザインプロトタイプで承認済みのため問題なし。
- **PNG Favicon 生成**: SVG から PNG へのラスタライズは手動または外部ツールが必要。CI パイプラインには含めない。 → `public/favicons/` に事前生成済み PNG を含めてコミット。
- **YearMonth ページの記事リスト UI 変更**: 現行のカード形式からタイムライン形式への変更は、ユーザーが慣れた UI を変える。 → プロトタイプで決定済み。ページング等の既存機能は維持。

## Migration Plan

1. `public/favicons/` に新 SVG・PNG・ICO を配置（`Layout.astro` に SVG favicon の `<link>` 追加）
2. `globals.scss` の `font-serif-jp` を変更（影響: 全ページの見出し）
3. `TagHeader` コンポーネント新設 → `HomePage/index.astro` で `tag` 時に使用
4. `YearMonthHeader` + `YearMonthArticleList` コンポーネント新設 → `HomePage/index.astro` で `yearmonth` 時に使用
5. `TableOfContents` コンポーネントを階層対応に更新

ロールバック: 各ファイルは独立しているため、問題があれば該当ファイルを個別に差し戻せる。
