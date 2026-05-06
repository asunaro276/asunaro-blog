## Why

現行の OpenSpec GitHub Pages サイト（`asunaro276.github.io/asunaro-blog`）は Markdown をそのまま HTML 変換した最小限のスタイルのみで、仕様書としての可読性が低い。エンジニア以外（PdM 等）が参照しても内容を把握しにくく、`DESIGN.md` で管理されているデザインシステムへのアクセス手段も存在しない。`specs.asunaroblog.net` として公開する統合ドキュメントポータルに刷新し、仕様書とデザインシステムの両方を一元管理・参照できる場にする。

## What Changes

- GitHub Pages のカスタムドメインを `specs.asunaroblog.net` に設定する
- `build-openspec-pages.ts` が生成するサイトを **Changes / Specs** と **Design System** の2セクションで構成されるポータルに刷新する
- 仕様ページを Requirement/Scenario の視覚的ブロック・カテゴリチップ・タスク進捗チェックリストを含むリッチな構造に変更する
- `design.md` 内の Mermaid コードブロックをビルド時に SVG へ変換し、フロー図として表示する
- `.openspec.yaml` の `stories:` フィールドに宣言されたストーリーを `storybook.asunaroblog.net` への iframe embed として spec ページに表示する
- `DESIGN.md` をパースして Design System セクション（カラースウォッチ・タイポグラフィ見本・スペーシング・角丸トークン）を自動生成する
- サイト自体のスタイルを asunaroblog デザインシステムのトークン（CSS 変数）で実装する

## Capabilities

### New Capabilities

- `docs-portal-design-system-section`: `DESIGN.md` のフロントマター（YAML）と本文を解析し、Design System セクション（カラースウォッチ・タイポグラフィ見本・スペーシング・角丸の視覚化）を生成する
- `docs-portal-storybook-embed`: `.openspec.yaml` の `stories:` フィールドに列挙されたストーリー ID を `storybook.asunaroblog.net` への iframe embed として spec ページ内に表示する
- `docs-portal-mermaid-rendering`: `design.md` 内の `mermaid` コードブロックをビルド時に SVG へ変換して表示する

### Modified Capabilities

- `openspec-pages-site`: サイト全体の構造をポータル（Changes 一覧 + Spec 詳細 + Design System）に刷新する。ステータスフィルタ・カテゴリチップ・Requirement/Scenario の視覚ブロック・タスク進捗チェックリストを含む新しい HTML テンプレートへ置き換える
- `openspec-pages-deploy`: CNAME ファイル（`specs.asunaroblog.net`）を gh-pages デプロイに含める

## Impact

- `scripts/build-openspec-pages.ts`：サイト生成ロジックの全面刷新（HTML テンプレート・Markdown パーサー・Mermaid 変換・DESIGN.md パーサー）
- `openspec/changes/**/.openspec.yaml`：`stories:` フィールドの追加（任意）
- `.github/workflows/`：CNAME 設定の追加
- DNS（asunaroblog.net）：`specs` サブドメインの CNAME レコード追加が必要（リポジトリ外作業）
- GitHub リポジトリ設定：Pages のカスタムドメイン欄への入力が必要（リポジトリ外作業）
- 本番ブログサイト（asunaroblog.net / Cloudflare Pages）には影響なし
