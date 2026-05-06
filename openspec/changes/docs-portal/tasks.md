## 0. 事前準備（ユーザー対応）

- [ ] 0.1 DNS に `specs` サブドメインの CNAME レコードを追加する（`specs.asunaroblog.net` → `asunaro276.github.io`）
- [ ] 0.2 GitHub リポジトリの Settings > Pages > Custom domain に `specs.asunaroblog.net` を入力して保存する

## 1. CSS アセットの整備

- [ ] 1.1 【確認手順の定義】`bun run build:openspec-pages` 実行後に `dist-openspec/assets/tokens.css` と `dist-openspec/assets/style.css` が存在することをシェルで確認できる手順を用意する
- [ ] 1.2 `scripts/assets/tokens.css` を作成し、デザインシステムの CSS 変数（`--fg`, `--bg`, `--accent` 等）を定義する（`/tmp/asunaro-design/specs/tokens.css` を参照）
- [ ] 1.3 `scripts/assets/style.css` を作成し、案 B のスタイルを実装する（`/tmp/asunaro-design/specs/style-b.css` を参照）
- [ ] 1.4 `scripts/build-openspec-pages.ts` に `scripts/assets/` を `dist-openspec/assets/` へコピーする処理を追加する
- [ ] 1.5 【検証】`bun run build:openspec-pages` を実行し、`dist-openspec/assets/tokens.css` と `dist-openspec/assets/style.css` が生成されることを確認する

## 2. Change 一覧ページ（index.html）の刷新

- [ ] 2.1 【確認手順の定義】ブラウザで `dist-openspec/index.html` を開き、以下を確認できる手順を定義する：Change カードが表示される・ステータスフィルタが動作する・"Design System" リンクが `design/` に遷移する
- [ ] 2.2 `build-openspec-pages.ts` の `buildIndexPage` 関数を全面書き換えし、以下を生成する：グローバルナビバー・カード形式の Change 一覧（Change 名・ステータスバッジ・概要・作成日）・ステータスフィルタ（All / Done / In Progress / Draft）
- [ ] 2.3 各 Change の `.openspec.yaml` から `status` フィールドを読み取り、カードのバッジに反映する（`status` フィールドがない場合は `draft` 扱い）
- [ ] 2.4 【検証】`bun run build:openspec-pages` 後にブラウザで `dist-openspec/index.html` を開き、2.1 の確認手順をすべて満たすことを確認する

## 3. Change 詳細ページの統合

- [ ] 3.1 【確認手順の定義】ブラウザで `dist-openspec/changes/docs-portal/index.html` を開き、以下を確認できる手順を定義する：proposal / design / tasks が1ページに縦並びで表示される・グローバルナビが表示される
- [ ] 3.2 `build-openspec-pages.ts` に `buildChangePage` 関数を追加する：`proposal.md` / `design.md`（存在する場合）/ `tasks.md`（存在する場合）を読み込み、セクション別に連結した HTML を `changes/<name>/index.html` として出力する
- [ ] 3.3 旧来の `proposal.html` / `design.html` / `tasks.html` を個別生成していたコードを削除する
- [ ] 3.4 【検証】`bun run build:openspec-pages` 後にブラウザで `dist-openspec/changes/docs-portal/index.html` を開き、3.1 の確認手順をすべて満たすことを確認する

## 4. Spec 詳細ページの視覚化

- [ ] 4.1 【確認手順の定義】ブラウザで `dist-openspec/specs/archive-heatmap/index.html` を開き、Requirement 見出し・WHEN / THEN ラベル付きの Scenario ブロックがスタイルされていることを確認できる手順を定義する
- [ ] 4.2 `build-openspec-pages.ts` に `buildSpecPage` 関数を追加する：`spec.md` を読み込み、`#### Scenario:` を検出して WHEN / THEN に識別スタイルを付けた HTML を `specs/<name>/index.html` として出力する
- [ ] 4.3 旧来の `spec.html` を個別生成していたコードを削除する
- [ ] 4.4 【検証】`bun run build:openspec-pages` 後にブラウザで `dist-openspec/specs/archive-heatmap/index.html` を開き、4.1 の確認手順をすべて満たすことを確認する

## 5. Design System ページの生成

- [ ] 5.1 【テストの作成】`scripts/build-openspec-pages.test.ts` を作成し、`parseDesignMd` 関数のユニットテストを書く（`DESIGN.md` の YAML フロントマターをパースして `colors` / `typography` / `spacing` / `rounded` オブジェクトが正しく返ることを確認）
- [ ] 5.2 `build-openspec-pages.ts` に `parseDesignMd` 関数を追加する：`gray-matter` で `DESIGN.md` のフロントマターを解析し `colors` / `typography` / `spacing` / `rounded` を返す
- [ ] 5.3 `build-openspec-pages.ts` に `buildDesignSystemPage` 関数を追加する：`parseDesignMd` の結果からカラースウォッチテーブル・タイポグラフィプレビュー・スペーシングバー・角丸ボックスを含む `dist-openspec/design/index.html` を生成する
- [ ] 5.4 `bun test` を実行し 5.1 のテストがパスすることを確認する
- [ ] 5.5 【検証】`bun run build:openspec-pages` 後にブラウザで `dist-openspec/design/index.html` を開き、Colors / Typography / Spacing / Border Radius の各セクションが正しく表示されることを確認する

## 6. Mermaid レンダリング

- [ ] 6.1 【確認手順の定義】`design.md` に ` ```mermaid ``` ` ブロックを含む Change の詳細ページをブラウザで開き、SVG 図が表示されることを確認できる手順を定義する
- [ ] 6.2 `build-openspec-pages.ts` の Markdown 変換処理で ` ```mermaid ``` ` コードブロックを `<pre class="mermaid">` 要素に変換するよう `marked` のレンダラーをカスタマイズする
- [ ] 6.3 Mermaid ブロックを含むページの HTML テンプレートに `<script type="module">` で Mermaid.js CDN（`cdn.jsdelivr.net/npm/mermaid@11`）を読み込む処理を追加する
- [ ] 6.4 【検証】`bun run build:openspec-pages` 後にブラウザで `dist-openspec/changes/docs-portal/index.html` を開き、design.md の Mermaid ブロックが SVG 図として表示されることを確認する

## 7. Storybook embed

- [ ] 7.1 【確認手順の定義】`stories:` フィールドを含む `.openspec.yaml` を持つ Change の詳細ページをブラウザで開き、Storybook の iframe が表示されることを確認できる手順を定義する
- [ ] 7.2 `build-openspec-pages.ts` の Change ページ生成処理で `.openspec.yaml` を読み込み、`stories:` フィールドを取得する処理を追加する
- [ ] 7.3 `stories:` フィールドがある場合、各ストーリー ID を `https://storybook.asunaroblog.net/iframe.html?id=<id>&viewMode=story` の `<iframe>` として Change 詳細ページに追加する
- [ ] 7.4 `docs-portal` change の `.openspec.yaml` にダミーの `stories:` フィールドを追加し動作確認用データとして使用する（確認後に削除）
- [ ] 7.5 【検証】`bun run build:openspec-pages` 後にブラウザで対象 Change の詳細ページを開き、7.1 の確認手順をすべて満たすことを確認する

## 8. カスタムドメインの設定

- [ ] 8.1 `.github/workflows/deploy-openspec-pages.yml` の `peaceiris/actions-gh-pages` ステップに `cname: specs.asunaroblog.net` オプションを追加する
- [ ] 8.2 `main` ブランチへ push し GitHub Actions が正常完了することを確認する
- [ ] 8.3 【検証】`https://specs.asunaroblog.net` にブラウザでアクセスし、ドキュメントポータルのトップページが表示されることを確認する（0.1・0.2 の DNS / GitHub Pages 設定完了後）
