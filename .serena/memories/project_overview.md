# プロジェクト概要

## プロジェクト名
**asunaro-blog** (asunaroblog)

## 目的
https://asunaroblog.net/ でホストされている個人ブログサイト。Jamstackアーキテクチャを使用した静的ブログ。

## 主な機能
- 静的サイト生成による最適なパフォーマンス
- Newt CMS（日本製のヘッドレスCMS）によるコンテンツ管理
- クライアントサイドJavaScriptを最小限に抑えた高速なサイト
- Tailwind CSSによるレスポンシブデザイン
- Markdown形式のブログ投稿（`src/posts/`に保存）
- ページネーション、カテゴリ、タグ、年月別アーカイブ機能
- コードのシンタックスハイライトとKaTeXによる数式レンダリング
- サイトマップ生成によるSEO最適化

## デプロイ環境
- **Cloudflare Pages**でホスティング
- 高性能なCDNを活用
- 静的サイト生成により高速なロード時間を実現

## リポジトリ情報
- 作業ディレクトリ: `/home/ryuhei/asunaro-blog`
- Gitリポジトリ: あり（mainブランチ）
- システム: Linux (WSL2)
