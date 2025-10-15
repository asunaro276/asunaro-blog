# 推奨コマンド

このプロジェクトで使用する主要なコマンド一覧。

## 開発コマンド

### 開発サーバー起動
```bash
bun run dev
```
- Astro開発サーバーを起動
- ホットリロードが有効
- 通常は http://localhost:4321 でアクセス可能

### ビルド
```bash
bun run build
```
- Astroの型チェック（`astro check`）を実行後、本番用ビルド
- 静的ファイルを`dist/`ディレクトリに生成
- デプロイ前に必ず実行

### プレビュー
```bash
bun run preview
```
- ビルド後の静的サイトをローカルでプレビュー
- 本番環境に近い状態で確認可能

## テスト

### テスト実行
```bash
bun test
```
- Bunの組み込みテストランナーでテストを実行
- `*.test.ts`パターンのファイルが対象

### 特定のテストファイル実行
```bash
bun test src/domain/models/page/Page.test.ts
```

### ウォッチモードでテスト
```bash
bun test --watch
```

## Storybook（コンポーネント開発）

### Storybook起動
```bash
bun run storybook
```
- ポート6006でStorybookを起動
- コンポーネントの開発・確認に使用

### Storybookビルド
```bash
bun run build-storybook
```
- Storybookの静的ビルドを生成

## パッケージ管理

### 依存関係インストール
```bash
bun install
```

### 依存関係追加
```bash
bun add <package-name>
```

### 開発依存関係追加
```bash
bun add -d <package-name>
```

### 依存関係更新
```bash
bun update
```
- Renovateによる自動更新も設定済み

## Git操作

### ステータス確認
```bash
git status
```

### 変更をステージング
```bash
git add .
```

### コミット
```bash
git commit -m "コミットメッセージ"
```

### プッシュ
```bash
git push
```

### ブランチ確認
```bash
git branch
```

## 型チェック

### Astro型チェック
```bash
bunx astro check
```
- ビルド時に自動実行されるが、個別実行も可能

### TypeScriptコンパイルチェック（参考）
```bash
bunx tsc --noEmit
```

## その他

### ディレクトリ構造確認
```bash
ls -la
```

### ファイル検索
```bash
find src -name "*.ts"
```

### 内容検索
```bash
grep -r "検索文字列" src/
```

## 注意事項
- このプロジェクトはLinux (WSL2)環境で動作
- パッケージマネージャーはBunを使用（npmやyarnではない）
- リンティング・フォーマッティングツール（ESLint, Prettierなど）の設定ファイルは確認されていないため、必要に応じて設定を追加する
