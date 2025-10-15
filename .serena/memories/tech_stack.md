# 技術スタック

## フレームワーク・ライブラリ

### メインフレームワーク
- **Astro v4.12+** - 静的サイトジェネレーター（SSG）
  - パフォーマンス重視の設計
  - クライアントに送信するJavaScriptを最小化
  - Reactコンポーネントとのシームレスな統合

### UIフレームワーク
- **React v19** - UIコンポーネント
- **React DOM v19**

### スタイリング
- **Tailwind CSS v3.4+** - ユーティリティファーストCSSフレームワーク
- **Sass** - CSSプリプロセッサ

### CMS
- **Newt** (newt-client-js v3.3+) - 日本製のヘッドレスCMS
  - ブログ記事のコンテンツ管理に使用

### その他の主要ライブラリ
- **TypeScript v5.5+** - 型安全性
- **@astrojs/check** - Astroの型チェック
- **@astrojs/sitemap** - サイトマップ生成
- **@astrolib/seo** - SEO最適化
- **highlight.js** - コードのシンタックスハイライト
- **katex** - 数式のレンダリング
- **tsyringe** - 依存性注入コンテナ
- **lodash** - ユーティリティ関数
- **open-graph-scraper** - OGP情報の取得
- **react-scroll** - スムーズスクロール

## 開発ツール

### パッケージマネージャー・ランタイム
- **Bun v1.2.22** - 高速なJavaScriptランタイム兼パッケージマネージャー

### テスト
- **Bun test** - 組み込みテストランナー
- テストファイルは `*.test.ts` パターン

### UI開発
- **Storybook** - コンポーネント開発環境
- **Chromatic** - ビジュアルテスト

### モック
- **MSW (Mock Service Worker) v2.3+** - APIモック

### その他
- **Renovate** - 依存関係の自動更新
