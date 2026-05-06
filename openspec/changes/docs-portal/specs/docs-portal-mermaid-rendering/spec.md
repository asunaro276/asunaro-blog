## ADDED Requirements

### Requirement: design.md 内の Mermaid ブロックを図として表示する
ビルドスクリプトは `design.md` の ` ```mermaid ``` ` コードブロックを `<pre class="mermaid">` 要素に変換し、生成された HTML ページでブラウザが Mermaid.js（CDN）を用いて SVG にレンダリングしなければならない（SHALL）。

#### Scenario: design.md に Mermaid ブロックが存在する場合
- **WHEN** Change の `design.md` に ` ```mermaid ``` ` コードブロックが含まれる
- **THEN** 生成された Change 詳細ページに `<pre class="mermaid">` 要素が存在する
- **THEN** ブラウザで表示すると Mermaid.js が当該要素を SVG にレンダリングする

#### Scenario: design.md に Mermaid ブロックが存在しない場合
- **WHEN** Change の `design.md` に ` ```mermaid ``` ` コードブロックが含まれない
- **THEN** 生成された Change 詳細ページに `<pre class="mermaid">` 要素は存在しない

#### Scenario: Mermaid.js の読み込み
- **WHEN** Mermaid ブロックを含む Change の詳細ページを表示する
- **THEN** ページの `<head>` に Mermaid.js を CDN（`cdn.jsdelivr.net/npm/mermaid`）から読み込む `<script type="module">` が含まれる
