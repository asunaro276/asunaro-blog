## Why

既存の OpenSpec GitHub Pages サイトはデザインが最低限のインラインスタイルのみで、可読性・見栄えが乏しい。また公開URLが `asunaro276.github.io/asunaro-blog` と長く、独自ドメインでアクセスできない。これらを解消してドキュメントポータルとしての体裁を整える。

## What Changes

- GitHub Pages にカスタムドメイン `specs.asunaroblog.net` を設定し、短いURLでアクセスできるようにする
- ビルドスクリプト（`scripts/build-openspec-pages.ts`）が生成する HTML のスタイルを、Claude で作成した既存デザイン（HTML/CSS）に置き換える

## Capabilities

### New Capabilities

なし（既存機能の改善のみ）

### Modified Capabilities

- `openspec-pages-site`: HTML 生成時に適用するスタイルを既存のインラインスタイルから新デザインに変更する

## Impact

- `scripts/build-openspec-pages.ts`：HTML テンプレート部分のスタイルを差し替え
- `.github/workflows/`：カスタムドメイン設定のため `cname` オプションを追加
- DNS（asunaroblog.net）：`specs` サブドメインの CNAME レコード追加が必要（リポジトリ外作業）
- GitHub リポジトリ設定：Pages のカスタムドメイン欄への入力が必要（リポジトリ外作業）
- 本番ブログサイト（Cloudflare Pages / asunaroblog.net）には影響なし
