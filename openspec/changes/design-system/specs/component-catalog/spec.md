## ADDED Requirements

### Requirement: Storybook のセットアップ
`.storybook/main.ts` と `.storybook/preview.ts` が存在し、`@storybook-astro/framework` を使って Astro・React コンポーネントを読み込める状態になっている。

#### Scenario: Storybook が起動できる
- **WHEN** `bun run storybook` を実行する
- **THEN** エラーなく Storybook 開発サーバーが起動する
- **THEN** ブラウザで localhost:6006 にアクセスできる

#### Scenario: グローバルスタイルが適用されている
- **WHEN** Storybook でコンポーネントを表示する
- **THEN** `tokens.scss` と `globals.scss` のスタイルが適用されている
- **THEN** CSS カスタムプロパティ（`--bg`, `--fg`, `--accent` 等）が有効になっている

### Requirement: 共通コンポーネントのストーリー
`common/` 配下の Astro コンポーネントのストーリーが存在する。

#### Scenario: CategoryHeader のストーリーが存在する
- **WHEN** Storybook の `common/CategoryHeader` を確認する
- **THEN** カテゴリ名・記事数・タブ一覧を表示するストーリーが存在する

#### Scenario: Header のストーリーが存在する
- **WHEN** Storybook の `common/Header` を確認する
- **THEN** ナビゲーション付きのヘッダーを表示するストーリーが存在する

#### Scenario: Footer のストーリーが存在する
- **WHEN** Storybook の `common/Footer` を確認する
- **THEN** フッターを表示するストーリーが存在する

### Requirement: ページ固有コンポーネントのストーリー
`HomePage/` および `PostPage/` 配下のコンポーネントのストーリーが存在する。

#### Scenario: PostCard のストーリーが存在する
- **WHEN** Storybook の `HomePage/PostCard` を確認する
- **THEN** 記事タイトル・カテゴリ・日付・カバー画像を表示するストーリーが存在する

#### Scenario: PaginationItem のストーリーが存在する
- **WHEN** Storybook の `HomePage/PaginationItem` を確認する
- **THEN** アクティブ・非アクティブの2バリアントのストーリーが存在する

#### Scenario: ArchiveHeatmap のストーリーが存在する
- **WHEN** Storybook の `common/SideBar/ArchiveHeatmap` を確認する
- **THEN** ヒートマップデータを渡したストーリーが存在する

### Requirement: Storybook のビルド
`bun run build-storybook` でエラーなく静的ファイルが生成される。

#### Scenario: Storybook ビルドが成功する
- **WHEN** `bun run build-storybook` を実行する
- **THEN** エラーなく完了し、`storybook-static/` ディレクトリが生成される
