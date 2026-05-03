## ADDED Requirements

### Requirement: RSS 2.0 フィードエンドポイントを提供する
サイトは `/rss.xml` で有効な RSS 2.0 XML ドキュメントを返さなければならない（SHALL）。フィードには直近 50 件の記事を含み、各アイテムはタイトル・URL・公開日・概要を持たなければならない（SHALL）。

#### Scenario: フィードにアクセスできる
- **WHEN** ユーザーが `/rss.xml` に GET リクエストを送る
- **THEN** Content-Type `application/xml` で RSS 2.0 形式の XML が返される

#### Scenario: 各記事アイテムが必須フィールドを持つ
- **WHEN** `/rss.xml` のレスポンスを解析する
- **THEN** 各 `<item>` に `<title>`, `<link>`, `<pubDate>`, `<description>` が含まれる

#### Scenario: 記事が最大 50 件に絞られる
- **WHEN** 記事が 50 件を超えて存在する
- **THEN** フィードには最新 50 件のみが含まれる

### Requirement: head タグにフィード自動検出リンクを含める
全ページの `<head>` に `<link rel="alternate" type="application/rss+xml">` タグを含めなければならない（SHALL）。

#### Scenario: alternate link が存在する
- **WHEN** 任意のページの HTML ソースを確認する
- **THEN** `<link rel="alternate" type="application/rss+xml" href="/rss.xml">` が `<head>` 内に存在する
