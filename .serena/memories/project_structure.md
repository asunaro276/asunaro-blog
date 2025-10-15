# プロジェクト構造

## ディレクトリ構成

このプロジェクトは**ドメイン駆動設計（DDD）**のレイヤードアーキテクチャを採用しています。

```
/home/ryuhei/asunaro-blog/
├── src/
│   ├── presentation/        # プレゼンテーション層（Astroの設定でsrcDirに指定）
│   │   ├── pages/           # Astroページ（ルーティング）
│   │   │   ├── index.astro            # トップページ
│   │   │   ├── [page].astro           # ページネーション
│   │   │   ├── blog/[id].astro        # 記事詳細ページ
│   │   │   ├── category/[category]/[page].astro  # カテゴリ別一覧
│   │   │   ├── tag/[tag]/[page].astro            # タグ別一覧
│   │   │   └── yearmonth/[yearmonth]/[page].astro # 年月別一覧
│   │   ├── components/      # Reactコンポーネント
│   │   │   ├── HomePage/    # ホームページ関連
│   │   │   ├── PostPage/    # 記事ページ関連
│   │   │   └── common/      # 共通コンポーネント（Header, Footer, SideBar等）
│   │   ├── layouts/         # レイアウトコンポーネント
│   │   ├── hooks/           # Reactカスタムフック
│   │   ├── styles/          # グローバルスタイル
│   │   └── middleware.ts    # Astroミドルウェア
│   ├── domain/              # ドメイン層
│   │   ├── models/          # ドメインモデル
│   │   │   ├── article/     # 記事関連モデル（Article, Category, Tag等）
│   │   │   ├── page/        # ページネーション
│   │   │   └── path/        # パス
│   │   └── interfaces/      # リポジトリインターフェース
│   │       └── article/     # 記事関連インターフェース
│   ├── usecase/             # ユースケース層（アプリケーション層）
│   │   ├── getArticle/              # 記事取得
│   │   ├── getArticleList/          # 記事一覧取得
│   │   ├── getCategoryArticleList/  # カテゴリ別記事一覧
│   │   ├── getTagArticleList/       # タグ別記事一覧
│   │   ├── getYearmonthArticleList/ # 年月別記事一覧
│   │   ├── getPagePaths/            # ページパス取得
│   │   ├── getCategoryPaths/        # カテゴリパス取得
│   │   ├── getTagPaths/             # タグパス取得
│   │   └── getYearmonthPaths/       # 年月パス取得
│   ├── infrastructure/      # インフラストラクチャ層
│   │   ├── di/              # 依存性注入（DIContainer）
│   │   ├── newt/            # Newt CMS連携（Repository実装）
│   │   └── htmlParser/      # HTMLパーサー（cheerio）
│   ├── posts/               # Markdown形式のブログ記事
│   ├── mocks/               # テスト用モックデータ
│   ├── constants.tsx        # 定数定義
│   ├── types.ts             # 型定義
│   └── env.d.ts             # 環境変数の型定義
├── public/                  # 静的ファイル
├── .serena/                 # Serenaプロジェクト設定
├── .claude/                 # Claude Code設定
├── astro.config.mjs         # Astro設定
├── tsconfig.json            # TypeScript設定
├── tailwind.config.js       # Tailwind CSS設定
├── package.json             # 依存関係とスクリプト
├── bun.lockb                # Bunロックファイル
└── README.md                # プロジェクトREADME

## アーキテクチャの特徴

### レイヤー構成
1. **プレゼンテーション層** (`src/presentation/`)
   - Astroページとコンポーネント
   - ユーザーインターフェース

2. **ユースケース層** (`src/usecase/`)
   - ビジネスロジック
   - 各ユースケースにはDTOと実装クラスが含まれる

3. **ドメイン層** (`src/domain/`)
   - ドメインモデルとビジネスルール
   - リポジトリインターフェース定義

4. **インフラストラクチャ層** (`src/infrastructure/`)
   - 外部サービス（Newt CMS）との連携
   - リポジトリの具体的な実装
   - 依存性注入コンテナ

### 依存性注入
- `DIContainer`クラスで全てのRepositoryとUseCaseの生成を一元管理
- シングルトンパターンでRepositoryインスタンスを管理
- tsyringeライブラリを使用

### パス設定
- `tsconfig.json`で`"/*": ["src/*"]`のパスエイリアスを設定
- インポート時は`/domain/...`のように絶対パスで記述
