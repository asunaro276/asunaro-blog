## Context

asunaroblog は Astro + Astro Content Collections で構築され、Cloudflare Pages でホスト。記事データのソースは環境によって切り替わる：

- **開発環境**: `./src/posts` 以下のローカル Markdown ファイル（`glob` ローダー）
- **本番環境**: Cloudflare R2 バケット上の Markdown ファイル（カスタム `r2Loader`）

どちらの環境でも `getCollection('posts')` で同一インターフェース越しに記事を取得できる。Newt CMS は現在利用していない（インフラ層に残骸コードはあるが DIContainer から参照されていない）。

UIデザインは blog-redesign-forest-rebrand のデザイントークン（CSS カスタムプロパティ: `--accent`, `--fg-2`, `--rule` 等）に準拠している。現状 RSS フィードは存在しない。

## Goals / Non-Goals

**Goals:**
- `/rss.xml` で標準的な RSS 2.0 フィードを配信する
- サイドバー（SideProfile）とフッター（Elsewhere セクション）に RSS 購読リンクを追加する
- `<head>` に `<link rel="alternate">` を追加し、ブラウザ・リーダーによる自動検出を可能にする

**Non-Goals:**
- Atom フィードや JSON Feed の生成
- フィードの認証・購読者管理
- メール購読機能

## Decisions

### 1. `@astrojs/rss` を使用する

Astro 公式インテグレーションであり、`rss()` ヘルパーが RSS 2.0 XML を生成する。カスタム実装より保守コストが低く、Astro のビルドパイプラインに自然に統合できる。

代替: 手書き XML テンプレート → メンテナンスが煩雑、バリデーションが困難なため却下。

### 2. RSS エンドポイントは `getCollection('posts')` を直接呼ぶ

`src/presentation/pages/rss.xml.ts` に Astro の `GET` エンドポイントを作成し、`getCollection('posts')` で全記事を取得する。DIContainer 経由にしないのは、RSS 生成には HTML 変換・ページネーションが不要であり、フロントマターの生データ（`publishedAt` の Date 型など）をそのまま使える方が余計な変換を挟まずシンプルなため。

フィールドマッピング（Content Collections frontmatter → RSS）:

| RSS フィールド | frontmatter フィールド |
|---|---|
| `title` | `data.title` |
| `pubDate` | `data.publishedAt`（Date 型、`@astrojs/rss` に直接渡せる） |
| `description` | `data.description` |
| `link` | `https://asunaroblog.net/blog/${entry.id}` |

### 3. 記事フィルタリングと件数上限

- `data.status === 'published'` の記事のみ含める（本番環境と同様のルール）
- `publishedAt` 降順で最新 50 件に絞る
- 記事URLは既存の `/blog/[id]` ルーティングに合わせる

### 4. 購読ボタンの配置

SideProfile は既存の GitHub・X のアイコンリンク群と同じ行（横並び）に RSS アイコンを追加する。フッターの Elsewhere セクションは既存の外部リンクと同列に「RSS ↗」テキストリンクを追加する。ボタンスタイルは `--accent` カラーを使用してフォレストリブランドのデザイントークンに準拠する。

## Risks / Trade-offs

- **R2 からの記事件数が多い場合のビルド時間増加** → 最新 50 件に絞ることで軽減。RSS の性質上（定期ポーリング）静的ビルドでの遅延は許容範囲
- **`entry.id` が slug またはファイル名の MD5 ハッシュになる場合がある** → `data.slug` が存在すればそれが `entry.id` になる（`r2Loader` の実装より）。ハッシュになるケースでは URL が不自然になるが、記事側で `slug` frontmatter を設定することで回避できる

## Migration Plan

1. `@astrojs/rss` をインストール（`bun add @astrojs/rss`）
2. `src/presentation/pages/rss.xml.ts` に RSS エンドポイントを作成
3. `src/presentation/layouts/Layout.astro` の `<head>` に alternate link を追加
4. `SideProfile/index.astro` に RSS アイコンリンクを追加
5. `Footer/index.astro` の Elsewhere セクションに RSS リンクを追加
6. ビルド確認・プレビューで `/rss.xml` の XML 検証

ロールバック: エンドポイントファイルを削除し、UI の変更を revert するだけで元に戻せる。破壊的変更なし。

## Open Questions

（なし）
