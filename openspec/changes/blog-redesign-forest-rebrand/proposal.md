## Why

現在のブログは技術ブログとして最低限の機能性と可読性は確保されているが、デザイン評価26/40点（独自性2.0/5・トレンド適合性2.5/5）と視覚的魅力・ブランドアイデンティティ・モダンさが大きく不足している（#42 #44 #47）。「迷わないが記憶に残らない」現状を脱するため、Forest Green を軸にした編集誌スタイルのリブランドを実施する。

## What Changes

- **カラーシステム**: oklch ベースの CSS custom properties による Light/Dark 2テーマに全面移行。Tailwind のユーティリティカラーを廃止 → #44 #30 解消
- **フォント**: Montserrat Subrayada を廃止し、Inter・Noto Sans JP・Noto Serif JP・JetBrains Mono の4書体体系に変更 → #47 貢献
- **ヘッダー**: ベタ背景 → スティッキー + blur backdrop。ロゴ・ナビ・検索/RSS を3カラムグリッドで整列 → #47 貢献
- **トップページ**: 最新記事をフィーチャーヒーロー（大見出し + 説明 + カバー画像）で先頭表示し、以降を3カラムカードグリッドに変更 → #45 #43 解消
- **記事カード**: サムネイル・カテゴリラベル・等幅日付・タグ一覧を含む統一カードに刷新。固定アスペクト比で画像高さ統一 → #45 解消
- **サイドバー**: プロフィール・タグチップ・月別ヒートマップ（年×月グリッド）の3セクション構成に再設計 → #42 #47 貢献
- **記事詳細ページ**: 左（タグ+シェア sticky）・中（本文）・右（TOC sticky）の3カラムレイアウトに変更。ホバーインタラクション追加 → #43 解消
- **カテゴリページ**: カテゴリタイトル・説明・記事数を表示するヘッダーセクションと、カテゴリ切替チップを追加
- **フッター**: 現行のシンプルフッターを4カラムグリッド（ブランド / カテゴリ / Elsewhere / Newsletter）に拡張 → #42 貢献
- **ページネーション**: Prev/Next を主役とし、ページ番号チップをセカンダリに配置する新デザインに変更。現在ページのハイライト強化 → #43 解消
- **ホバーインタラクション**: カード・ナビ・ボタン全体にフィードバックを追加 → #43 解消

## Capabilities

### New Capabilities

- `theme-system`: CSS custom properties（oklch）による Light/Dark テーマの定義と切替機構
- `site-header`: スティッキー blur ヘッダー（ロゴ・ナビ・検索/RSS）
- `hero-section`: トップページの Featured ヒーローセクション
- `article-card`: サムネイル付き統一記事カード（一覧・Suggested 共通）
- `sidebar-profile`: プロフィール + ソーシャルリンクサイドバーセクション
- `sidebar-tags`: タグチップ型サイドバーセクション
- `archive-heatmap`: 年×月グリッドヒートマップ形式のアーカイブウィジェット
- `post-layout`: 3カラム記事詳細レイアウト（タグ sticky / 本文 / TOC sticky）
- `category-header`: カテゴリページのヘッダーセクション（タイトル・説明・記事数・切替タブ）
- `site-footer`: 4カラムグリッドフッター
- `pagination`: Prev/Next + ページ番号チップのページネーション

### Modified Capabilities

（既存 spec なし）

## Impact

- **CSS/スタイル**: `globals.scss` を新テーマ変数定義に全面置換。CSS custom properties 中心へ移行
- **フォント**: `Layout.astro` の Google Fonts リンクを変更（Inter, Noto Sans/Serif JP, JetBrains Mono）
- **コンポーネント**: `Header`, `Footer`, `SideBar`, `PostCard`, `Pagination` を全面刷新。`HeroSection`, `ArchiveHeatmap`, `CategoryHeader` を新規作成
- **依存関係**: 新規フォントは Google Fonts CDN 経由。Tailwind config を CSS vars に対応させる
- **既存機能**: ページルーティング・CMS連携・DDDレイヤーには変更なし
