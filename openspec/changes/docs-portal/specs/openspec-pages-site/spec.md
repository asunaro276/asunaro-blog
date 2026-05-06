## MODIFIED Requirements

### Requirement: インデックスページを生成する
ビルドスクリプトは `openspec/changes/` を走査し、各 Change をカード形式で一覧表示する `index.html` を生成しなければならない（SHALL）。

#### Scenario: changes が存在する場合
- **WHEN** `openspec/changes/` に1件以上のサブディレクトリが存在する
- **THEN** 各 Change のカードが生成され、Change 名・ステータスバッジ・概要（proposal.md の Why セクション1文）・カテゴリチップ・作成日が表示される

#### Scenario: ステータスフィルタの動作
- **WHEN** インデックスページで "Done" フィルタボタンをクリックする
- **THEN** `status: done` の Change カードのみが表示される
- **WHEN** "All" フィルタボタンをクリックする
- **THEN** すべての Change カードが表示される

#### Scenario: changes ディレクトリが空の場合
- **WHEN** `openspec/changes/` にサブディレクトリが存在しない
- **THEN** 「Changes なし」等のメッセージが表示される

### Requirement: Change 詳細ページを生成する
ビルドスクリプトは各 Change に対して proposal / design / tasks を1ページに統合した `changes/<name>/index.html` を生成しなければならない（SHALL）。

#### Scenario: Change 詳細ページの生成
- **WHEN** `openspec/changes/<name>/` に `proposal.md` が存在する
- **THEN** `dist-openspec/changes/<name>/index.html` が生成される
- **THEN** ページ内に proposal・design（存在する場合）・tasks（存在する場合）のセクションが縦スクロールで並ぶ

#### Scenario: Mermaid ブロックの変換
- **WHEN** `design.md` に ` ```mermaid ``` ` ブロックが含まれる
- **THEN** `<pre class="mermaid">` 要素として出力される

### Requirement: Spec 詳細ページを生成する
ビルドスクリプトは `openspec/specs/<name>/spec.md` を Requirement/Scenario の視覚ブロック付きで `specs/<name>/index.html` に変換しなければならない（SHALL）。

#### Scenario: Spec 詳細ページの生成
- **WHEN** `openspec/specs/<name>/spec.md` が存在する
- **THEN** `dist-openspec/specs/<name>/index.html` が生成される

#### Scenario: Scenario ブロックの視覚化
- **WHEN** `spec.md` に `#### Scenario:` ブロックが含まれる
- **THEN** 生成された HTML で WHEN / THEN がそれぞれ識別可能なラベル付きスタイルで表示される

### Requirement: グローバルナビゲーションを含む
すべての生成ページはトップナビゲーションバーを含まなければならない（SHALL）。

#### Scenario: ナビゲーションの存在確認
- **WHEN** 任意の生成ページを表示する
- **THEN** "Changes" と "Design System" へのリンクを含むナビゲーションバーが表示される

### Requirement: CSS アセットを出力する
ビルドスクリプトは `dist-openspec/assets/tokens.css` と `dist-openspec/assets/style.css` を出力しなければならない（SHALL）。

#### Scenario: アセットの生成
- **WHEN** ビルドを実行する
- **THEN** `dist-openspec/assets/tokens.css` が存在する
- **THEN** `dist-openspec/assets/style.css` が存在する

## REMOVED Requirements

### Requirement: 各 Markdown ファイルを HTML ページとして生成する
**Reason**: `proposal.html` / `spec.html` 形式の個別変換は廃止し、Change 詳細・Spec 詳細の専用ページ生成に置き換える
**Migration**: `changes/<name>/proposal.html` → `changes/<name>/index.html`、`specs/<name>/spec.html` → `specs/<name>/index.html`

### Requirement: 各 HTML ページにはナビゲーションリンクを含む
**Reason**: 「← インデックスに戻る」単一リンクのナビゲーションは、グローバルナビゲーションバー（Changes / Design System）に統合する
**Migration**: 新しいグローバルナビゲーションバーが同等の機能を提供する
