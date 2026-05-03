## Context

現在 `openspec/` 配下には changes（変更提案）と specs（機能仕様）の Markdown ファイルが蓄積されているが、GitHub のファイルツリーを辿る以外に参照手段がない。静的 HTML に変換して GitHub Pages として公開することで、ブラウザ上からインデックス・全文閲覧できる開発者ポータルを整備する。

本ブログ本体は Astro + Cloudflare Pages でホスティングされており、GitHub Pages は**まったく別のデプロイ先**として独立させる。

## Goals / Non-Goals

**Goals:**

- `openspec/changes/` と `openspec/specs/` の Markdown を HTML に変換してインデックスページ＋詳細ページを生成する
- GitHub Actions の push トリガーで自動デプロイする（`main` ブランチへのプッシュ時）
- 既存の Astro ビルドパイプライン（Cloudflare Pages デプロイ）に影響を与えない

**Non-Goals:**

- 検索機能・フルテキストインデックス
- 認証・アクセス制御
- ブログ本体（asunaroblog.net）との統合
- デザインの凝ったスタイリング（最低限の可読性があれば十分）

## Decisions

### 決定1: 静的サイトジェネレーターは Node.js スクリプト（Bun）で自前実装する

- **決定**: 専用の SSG ライブラリ（VitePress, MkDocs など）を使わず、Bun で動くシンプルなスクリプト（`scripts/build-openspec-pages.ts`）として実装する
- **理由**: 依存関係を最小化し、既存の Bun 環境で動かせる。OpenSpec の独自ディレクトリ構造（changes/specs の二層）に特化した出力が容易。
- **代替案**: VitePress → 設定が複雑でバンドルサイズが大きい。MkDocs → Python 環境が必要でエコシステムが分断される。

### 決定2: Markdown レンダリングは `marked` ライブラリを使う

- **決定**: `marked`（npm）で Markdown → HTML に変換し、インラインスタイルまたは最小限の CSS で装飾する
- **理由**: 軽量・依存なし・Bun 環境で動作実績がある。
- **代替案**: `remark` → プラグイン設定が複雑。`unified` → 同上。

### 決定3: GitHub Pages の公開ブランチは `gh-pages`（別ブランチ）

- **決定**: ビルド成果物を `gh-pages` ブランチに push し、GitHub Pages のソースとして設定する
- **理由**: `main` ブランチに HTML を混入させるとリポジトリが汚れる。`actions/deploy-pages` で標準的なパターン。
- **代替案**: `docs/` フォルダを `main` ブランチに含める → `openspec/` と HTML が混在して混乱しやすい。

### 決定4: 出力ディレクトリは `dist-openspec/`

- **決定**: Astro のビルド出力 `dist/` と区別するため `dist-openspec/` を使用し、`.gitignore` に追加する
- **理由**: ローカルビルドと本番デプロイを分離しやすい。

## Risks / Trade-offs

- **GitHub Pages のリポジトリ設定が未設定** → リポジトリ設定で Pages を有効化し、ソースを `gh-pages` ブランチにする手順をタスクに含める
- **`marked` のセキュリティ**（XSS） → GitHub Pages は内部開発者向けのため許容範囲。外部公開する場合は `sanitize-html` の追加を検討。
- **`gh-pages` ブランチが存在しない場合の初回デプロイ失敗** → `peaceiris/actions-gh-pages` を使えば自動作成されるため問題なし。
