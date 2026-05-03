## 1. 依存パッケージのインストール

- [ ] 1.1 `@astrojs/rss` を bun add でインストールする

## 2. RSS フィードエンドポイントの実装

- [ ] 2.1 `Article` ドメインモデルの `publishedAt` フィールド（または代替フィールド）を確認し、pubDate として使用できる値を特定する
- [ ] 2.2 `Article` の概要として使用する description フィールド（`meta.description` 等）を確認する
- [ ] 2.3 `src/presentation/pages/rss.xml.ts` を作成し、`@astrojs/rss` の `rss()` を使って直近 50 件の記事フィードを生成する
- [ ] 2.4 DIContainer 経由で `GetArticleList` ユースケースを呼び出して記事データを取得するよう実装する

## 3. head タグへの自動検出リンク追加

- [ ] 3.1 共通レイアウトファイル（`src/presentation/layouts/`）を特定する
- [ ] 3.2 全ページの `<head>` に `<link rel="alternate" type="application/rss+xml" title="asunaroblog RSS" href="/rss.xml">` を追加する

## 4. サイドバー RSS 購読ボタンの実装

- [ ] 4.1 `src/presentation/components/common/SideBar/SideProfile/index.astro` に RSS アイコン（SVG inline）と `/rss.xml` へのリンクボタンを追加する
- [ ] 4.2 ボタンのスタイルに `--accent` カラーを使用し、light/dark テーマに追従するよう CSS カスタムプロパティで指定する

## 5. フッター Elsewhere セクションへの RSS リンク追加

- [ ] 5.1 `src/presentation/components/common/Footer/index.astro` の Elsewhere セクションに `href="/rss.xml"` の「RSS ↗」リンクを追加する
- [ ] 5.2 スタイルが既存の GitHub・X リンク（`font-size: 13px; color: var(--fg-2)`）と一致していることを確認する

## 6. 動作確認

- [ ] 6.1 `bun run build` が成功することを確認する
- [ ] 6.2 `bun run preview` で `/rss.xml` にアクセスし、有効な RSS 2.0 XML が返ることを確認する
- [ ] 6.3 ブラウザで各ページの `<head>` に alternate link が存在することを確認する
- [ ] 6.4 サイドバーとフッターに RSS リンクが表示され、クリックで `/rss.xml` に遷移することを確認する
