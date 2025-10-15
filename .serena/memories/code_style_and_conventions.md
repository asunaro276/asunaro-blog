# コードスタイルと規約

## 言語とタイプチェック

### TypeScript
- **TypeScript v5.5+**を使用
- `tsconfig.json`でAstroの厳格な設定を継承（`"extends": "astro/tsconfigs/strict"`）
- 型定義ファイル: `@types/bun`, `@types/node`, `@types/react`等

### コンパイラオプション
```json
{
  "jsx": "react-jsx",
  "jsxImportSource": "react",
  "esModuleInterop": true
}
```

## ファイル構成規約

### コンポーネント
- 各コンポーネントは専用のディレクトリに配置
- エントリーポイントは`index.tsx`または`index.astro`
- 例: `src/presentation/components/HomePage/Pagination/index.tsx`

### テストファイル
- テストファイルは`*.test.ts`パターン
- テスト対象ファイルと同じディレクトリに配置
- 例: `src/domain/models/page/Page.test.ts`

### ユースケース
- 各ユースケースは専用ディレクトリに配置
- `DTO.ts` - データ転送オブジェクト
- `GetXxx.ts` - ユースケース実装クラス

## 命名規約

### クラス・インターフェース
- **PascalCase**を使用
- インターフェース名は`I`プレフィックス（例: `IArticleRepository`）
- クラス名は役割を明確に（例: `GetArticleList`, `NewtArticleRepository`）

### 変数・関数
- **camelCase**を使用
- privateプロパティは`_`プレフィックス（例: `_htmlBody`, `_articleRepository`）
- 定数は**UPPER_SNAKE_CASE**（例: `ARTICLE_NUM_PER_PAGE`）

### ファイル名
- コンポーネント: `index.tsx` / `index.astro`
- モデル: PascalCase（例: `Article.ts`, `Category.ts`）
- ユースケース: PascalCase（例: `GetArticleList.ts`）
- テスト: `*.test.ts`

## インポート規約

### パスエイリアス
- `src/`からの絶対パスインポートを使用
- プレフィックスは`/`
- 例:
  ```typescript
  import { Article } from "/domain/models/article/Article"
  import { DIContainer } from "/infrastructure/di/DIContainer"
  ```

### インポート順序
1. 外部ライブラリ
2. Astro関連
3. プロジェクト内のインポート（Repository → Domain → UseCase）
4. 型のみのインポートは`import type`を使用

## コーディング規約

### ドメインモデル
- 不変性を重視（`readonly`プロパティの活用）
- privateコンストラクタ + staticファクトリメソッド（`create`）パターン
- バリデーションロジックはコンストラクタ内で実施
- 例:
  ```typescript
  private constructor(readonly value: number) {
    if (value < 1 || !Number.isInteger(value)) {
      throw new Error('ページ番号が自然数ではありません')
    }
  }
  
  static create(...args) {
    return new Class(...args)
  }
  ```

### リポジトリパターン
- インターフェースは`src/domain/interfaces/`に定義
- 実装は`src/infrastructure/`に配置
- 命名: `Newt{Entity}Repository`（例: `NewtArticleRepository`）

### 依存性注入
- `DIContainer`クラスで一元管理
- Repositoryはシングルトン
- UseCaseは都度生成

### コメント
- クラスやメソッドにJSDoc形式のコメントを記述
- 日本語でのコメントも使用されている
- 例:
  ```typescript
  /**
   * 依存関係注入コンテナ
   * 全てのRepositoryとUseCaseのインスタンス作成を一元管理
   */
  export class DIContainer {
  ```

## テスト規約

### テストフレームワーク
- **Bun test**を使用
- `describe` - テストスイート
- `test` - 個別のテストケース
- `expect` - アサーション

### テスト構成
- `describe`で正常系・異常系を分ける
- テストケース名は日本語で記述
- 例:
  ```typescript
  describe('Page', () => {
    describe('正常系', () => {
      test('有効な値を引数にするとvalueにページ数の文字列が入る', () => {
        expect(new Page(10).value).toBe(10)
      })
    })
    
    describe('異常系', () => {
      test('不正な値を引数にするとエラーを投げる', () => {
        expect(() => new Page(-1)).toThrow('ページ番号が自然数ではありません')
      })
    })
  })
  ```

## Astro固有の規約

### 設定
- `srcDir`は`./src/presentation`に設定
- サイトURL: `https://asunaroblog.net`
- 画像ドメイン許可: `storage.googleapis.com`（Newt CDN）

### ページルーティング
- ファイルベースルーティング
- 動的ルート: `[param].astro`
- 例: `blog/[id].astro`, `[page].astro`
