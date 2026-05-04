## Requirements

### Requirement: 全ページへの SEO メタタグ付与
すべてのページに `<title>` と `<meta name="description">` を設定する。`@astrolib/seo` の `AstroSeo` コンポーネントを使用する。

#### Scenario: トップページの SEO タグ
- **WHEN** トップページを表示する
- **THEN** `<title>` が "Asunaro Blog" になっている
- **THEN** `<meta name="description">` にブログの説明文が設定されている

#### Scenario: 記事ページの SEO タグ
- **WHEN** 記事詳細ページを表示する
- **THEN** `<title>` が記事タイトルになっている
- **THEN** `<meta name="description">` が記事の説明文（HTML タグ除去済み）になっている

### Requirement: Open Graph タグの付与
SNS シェア時に適切なプレビューが表示されるよう OGP タグを全ページに設定する。

#### Scenario: 記事ページの OGP タグ
- **WHEN** 記事詳細ページを表示する
- **THEN** `og:title` に記事タイトルが設定されている
- **THEN** `og:description` に記事の説明文が設定されている
- **THEN** `og:image` に記事のカバー画像 URL が設定されている

### Requirement: Twitter Card タグの付与
Twitter（X）での大型画像プレビューを有効化する。

#### Scenario: Twitter Card タグが設定される
- **WHEN** 任意のページを表示する
- **THEN** `twitter:card` が `summary_large_image` に設定されている

### Requirement: サイトマップの自動生成
`@astrojs/sitemap` により `sitemap-index.xml` を自動生成し、検索エンジンのクロールを支援する。

#### Scenario: サイトマップが生成される
- **WHEN** サイトをビルドする
- **THEN** `dist/sitemap-index.xml` が生成される
- **THEN** `<link rel="sitemap" href="/sitemap-index.xml">` が `<head>` に含まれる
