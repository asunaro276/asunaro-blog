# Obsidian → Cloudflare R2 同期設定ガイド

このガイドでは、Obsidianの特定フォルダ（`02Posts`）をCloudflare R2に同期し、ビルド時にR2から記事を取得する設定方法を説明します。

## アーキテクチャ概要

```
Obsidian (02Posts/) → Remotely Save → R2 Bucket → Astro Custom Loader → Content Collection
```

## 前提条件

- Cloudflareアカウント
- Obsidian（デスクトップ版）
- R2バケットへのアクセス権限

## ステップ1: Cloudflare R2の設定

### 1.1 R2バケットの作成

1. Cloudflareダッシュボードにログイン
2. **R2** セクションに移動
3. **Create bucket** をクリック
4. バケット名を入力（例: `asunaro-blog-posts`）
5. **Create bucket** で作成完了

### 1.2 R2 APIトークンの作成

1. R2ダッシュボードで **Manage R2 API Tokens** をクリック
2. **Create API Token** をクリック
3. トークン名を入力（例: `obsidian-sync-token`）
4. **Permissions** で以下を選択：
   - Object Read & Write
5. **Create API Token** で作成
6. 表示される以下の情報を**コピーして保存**：
   - Access Key ID
   - Secret Access Key
   - エンドポイントURL（形式: `https://<account-id>.r2.cloudflarestorage.com`）

> ⚠️ Secret Access Keyは一度しか表示されないため、必ず保存してください

## ステップ2: Obsidian Remotely Saveプラグインの設定

### 2.1 プラグインのインストール

1. Obsidianを起動
2. **設定（⚙️）** → **コミュニティプラグイン** を開く
3. **Browse** をクリック
4. 「**Remotely Save**」を検索
5. **Install** → **Enable** で有効化

### 2.2 Remotely Saveの設定

1. **設定** → **Remotely Save** を開く
2. 以下の項目を設定：

#### Remote Type
```
S3 or S3-compatible
```

#### S3 Config
```
Endpoint: https://<your-account-id>.r2.cloudflarestorage.com
Region: auto
Access Key ID: <R2で作成したAccess Key ID>
Secret Access Key: <R2で作成したSecret Access Key>
Bucket Name: asunaro-blog-posts
```

#### Advanced Settings（オプション）
- **Sync folder**: 空欄のまま（Vault全体を同期）またはフィルター設定
- **Exclude patterns**: 同期しないファイルのパターン（例: `.obsidian/**`）
- **Include patterns**: `02Posts/**/*.md` （02Postsフォルダのみ同期する場合）

### 2.3 同期の実行

1. コマンドパレット（`Ctrl/Cmd + P`）を開く
2. 「**Remotely Save: Sync**」を選択
3. 初回同期が完了するまで待つ

### 2.4 自動同期の設定（オプション）

- **設定** → **Remotely Save** → **Auto sync** で自動同期間隔を設定可能
- 例: 30分ごとに自動同期

## ステップ3: Astroプロジェクトの設定

### 3.1 環境変数の設定

`.env`ファイルに以下を追加：

```bash
# R2を使用する場合はtrueに設定
USE_R2=true

# R2バケット名
R2_BUCKET_NAME=asunaro-blog-posts

# R2エンドポイント
R2_ENDPOINT=https://<your-account-id>.r2.cloudflarestorage.com

# R2 APIトークン
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
```

### 3.2 Cloudflare Pagesでの環境変数設定

1. Cloudflare Pagesダッシュボードを開く
2. プロジェクトの **Settings** → **Environment variables** に移動
3. 以下の環境変数を追加：
   - `USE_R2` = `true`
   - `R2_BUCKET_NAME` = `asunaro-blog-posts`
   - `R2_ENDPOINT` = `https://<account-id>.r2.cloudflarestorage.com`
   - `R2_ACCESS_KEY_ID` = `<your-access-key>`
   - `R2_SECRET_ACCESS_KEY` = `<your-secret-key>`

> 💡 本番環境とプレビュー環境で異なる設定が可能です

## ステップ4: 動作確認

### ローカルでの確認

```bash
# 開発サーバー起動
bun dev
```

ログに以下のような出力が表示されればOK：
```
[r2-loader] Loading posts from R2 bucket: asunaro-blog-posts
[r2-loader] Found X markdown files in R2
[r2-loader] Loaded: post-title-1
[r2-loader] Successfully loaded X posts from R2
```

### ビルドでの確認

```bash
# ビルド実行
bun run build
```

R2から記事が正しく取得され、ビルドが成功することを確認

## トラブルシューティング

### エラー: "R2 credentials not found"

- `.env`ファイルに環境変数が正しく設定されているか確認
- 変数名のスペルミスがないか確認

### エラー: "Access Denied"

- R2 APIトークンの権限が正しいか確認（Object Read & Write）
- バケット名が正しいか確認

### 記事が表示されない

- R2バケットにファイルがアップロードされているか確認
- Markdownファイルのfrontmatterが正しいか確認（スキーマに準拠）

### Remotely Saveの同期が失敗する

- エンドポイントURLが正しいか確認（`https://`から始まる）
- Region が `auto` になっているか確認
- Access Key ID / Secret Access Key が正しいか確認

## ローカル/R2の切り替え

`.env`ファイルで簡単に切り替え可能：

```bash
# ローカルMarkdownを使用
USE_R2=false

# R2から取得
USE_R2=true
```

## 参考リンク

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Remotely Save Plugin](https://github.com/remotely-save/remotely-save)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
