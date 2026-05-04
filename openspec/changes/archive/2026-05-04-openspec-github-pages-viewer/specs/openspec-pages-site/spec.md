## ADDED Requirements

### Requirement: インデックスページを生成する
ビルドスクリプトは `openspec/changes/` と `openspec/specs/` を走査し、すべての変更・仕様へのリンクを含む `index.html` を生成しなければならない（SHALL）。

#### Scenario: changes が存在する場合
- **WHEN** `openspec/changes/` に1件以上のサブディレクトリが存在する
- **THEN** 各変更のディレクトリ名をリンクテキストとしてトップページに一覧表示する

#### Scenario: specs が存在する場合
- **WHEN** `openspec/specs/` に1件以上のサブディレクトリが存在する
- **THEN** 各仕様のディレクトリ名をリンクテキストとしてトップページに一覧表示する

#### Scenario: ディレクトリが空の場合
- **WHEN** `changes/` または `specs/` にサブディレクトリが存在しない
- **THEN** 該当セクションには「（なし）」等のメッセージを表示する

### Requirement: 各 Markdown ファイルを HTML ページとして生成する
ビルドスクリプトは各変更・各仕様の Markdown ファイルを個別の HTML ページに変換しなければならない（SHALL）。

#### Scenario: proposal.md の変換
- **WHEN** `openspec/changes/<name>/proposal.md` が存在する
- **THEN** `dist-openspec/changes/<name>/proposal.html` として出力される

#### Scenario: spec.md の変換
- **WHEN** `openspec/specs/<name>/spec.md` が存在する
- **THEN** `dist-openspec/specs/<name>/spec.html` として出力される

#### Scenario: ネストしたディレクトリの Markdown
- **WHEN** `openspec/changes/<name>/specs/<sub>/spec.md` のようにネストしたパスに Markdown がある
- **THEN** ディレクトリ構造を保ったまま HTML に変換される

### Requirement: 各 HTML ページにはナビゲーションリンクを含む
生成される HTML ページはトップページへ戻るリンクを含まなければならない（SHALL）。

#### Scenario: ナビゲーションの存在確認
- **WHEN** 任意の詳細ページ HTML を開く
- **THEN** 「Home」または「インデックスに戻る」等のリンクが表示される

### Requirement: 出力先は `dist-openspec/` ディレクトリ
ビルドスクリプトは `dist-openspec/` ディレクトリに成果物を出力しなければならない（SHALL）。

#### Scenario: ビルド実行
- **WHEN** ビルドスクリプトを実行する
- **THEN** `dist-openspec/index.html` が生成される
- **THEN** `dist-openspec/` 配下に各 Markdown に対応する HTML が生成される
