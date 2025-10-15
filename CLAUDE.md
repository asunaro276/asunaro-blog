# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**asunaro-blog**は、Astro + React + Newt CMSで構築された個人ブログサイト（https://asunaroblog.net/）です。ドメイン駆動設計（DDD）のレイヤードアーキテクチャを採用し、Cloudflare Pagesでホスティングされています。

## 開発コマンド

### 基本的な開発フロー
```bash
# 開発サーバーの起動
bun dev

# ビルド（型チェック + ビルド）
bun run build

# プレビュー
bun run preview
```

### Storybook
```bash
# Storybook開発サーバー
bun run storybook

# Storybookビルド
bun run build-storybook
```

### テスト
```bash
# 全テストの実行
bun test

# 特定のテストファイルを実行
bun test src/domain/models/page/Page.test.ts

# テストファイルパターン: **/*.test.ts
```

## アーキテクチャ

### レイヤー構成

このプロジェクトは**ドメイン駆動設計（DDD）**に基づく4層アーキテクチャです：

1. **プレゼンテーション層** (`src/presentation/`)
   - Astroの`srcDir`として設定
   - `pages/`: ファイルベースルーティング（動的ルート含む）
   - `components/`: Reactコンポーネント（HomePage, PostPage, common等）
   - `layouts/`: レイアウトコンポーネント
   - `hooks/`: Reactカスタムフック

2. **ユースケース層** (`src/usecase/`)
   - 各ユースケースは専用ディレクトリに配置
   - `DTO.ts` + 実装クラス（例: `GetArticleList.ts`）の構成
   - 記事取得、一覧取得、パス生成等のビジネスロジック

3. **ドメイン層** (`src/domain/`)
   - `models/`: ドメインモデル（Article, Category, Tag, Page, Path等）
   - `interfaces/`: リポジトリインターフェース定義
   - 不変性重視（readonly）、privateコンストラクタ + staticファクトリメソッドパターン

4. **インフラストラクチャ層** (`src/infrastructure/`)
   - `di/`: DIContainer（依存性注入の一元管理）
   - `newt/`: Newt CMSリポジトリ実装
   - `htmlParser/`: HTMLパーサー（cheerio）

### 依存性注入

- `DIContainer`クラスですべてのRepositoryとUseCaseを管理
- Repositoryはシングルトン、UseCaseは都度生成
- tsyringeライブラリを使用

### パスエイリアス

`tsconfig.json`で`"/*": ["src/*"]`を設定。インポートは絶対パスで記述：

```typescript
import { Article } from "/domain/models/article/Article"
import { DIContainer } from "/infrastructure/di/DIContainer"
```

## コーディング規約

### ドメインモデルパターン
```typescript
export class ModelName {
  private constructor(readonly value: SomeType) {
    // バリデーション
    if (/* 条件 */) {
      throw new Error('エラーメッセージ');
    }
  }

  static create(...args): ModelName {
    return new ModelName(...args);
  }
}
```

### 命名規約
- クラス・インターフェース: PascalCase
- インターフェース: `I`プレフィックス（例: `IArticleRepository`）
- 変数・関数: camelCase
- privateプロパティ: `_`プレフィックス（例: `_articleRepository`）
- 定数: UPPER_SNAKE_CASE（例: `ARTICLE_NUM_PER_PAGE`）

### テスト構成
```typescript
describe('ClassName', () => {
  describe('正常系', () => {
    test('テストケースの説明（日本語）', () => {
      expect(/* ... */).toBe(/* ... */);
    });
  });

  describe('異常系', () => {
    test('エラーケースの説明', () => {
      expect(() => /* ... */).toThrow('エラーメッセージ');
    });
  });
});
```

## 重要な設定ファイル

### astro.config.mjs
- `srcDir: './src/presentation'` - プレゼンテーション層をAstroのソースディレクトリに設定
- `site: 'https://asunaroblog.net'` - 本番サイトURL
- `image.domains: ['storage.googleapis.com']` - Newt CDNからの画像取得を許可

### tsconfig.json
- パスエイリアス: `"/*": ["src/*"]`
- `"extends": "astro/tsconfigs/strict"` - Astroの厳格な型チェック

## ブログ記事

- Markdown形式の記事は`src/posts/`に配置
- Newt CMSから取得される記事と、ローカルMarkdownの両方に対応

## Newt CMS連携

- `newt-client-js`ライブラリを使用
- Repository実装は`src/infrastructure/newt/`
- 記事、カテゴリ、タグ、年月アーカイブ等のデータを管理
