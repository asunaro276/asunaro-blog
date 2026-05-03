## Why

読者がRSSリーダー経由でブログの更新を自動的に受け取れる手段がなく、リピーターの獲得機会を逃している。Astro標準の`@astrojs/rss`パッケージを使えば最小コストで実現でき、購読ボタンをサイドバー・フッターに配置することで導線も作れる。

## What Changes

- `/rss.xml` エンドポイントを追加する（Astro RSS インテグレーション）
- サイドバーおよびフッターに RSS 購読ボタン（アイコン＋リンク）を追加する
- `<head>` に `<link rel="alternate" type="application/rss+xml">` を追加し、RSSリーダーが自動検出できるようにする

## Capabilities

### New Capabilities

- `rss-feed`: `/rss.xml` を生成するエンドポイント。全記事のタイトル・URL・公開日・概要を含む標準的な RSS 2.0 フィード
- `rss-subscribe-ui`: サイドバーとフッターに配置する RSS 購読ボタン UI。フォレストリブランドのデザイントークン（`--accent`, `--fg-2` 等）に準拠したスタイリング

### Modified Capabilities

（なし）

## Impact

- 新規依存: `@astrojs/rss`（Astro 公式パッケージ）
- 変更ファイル: `astro.config.mjs`（RSS インテグレーション追加）、`src/presentation/layouts/`（`<head>` への alternate link）、サイドバー・フッターコンポーネント
- 既存機能への破壊的変更なし
