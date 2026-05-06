## ADDED Requirements

### Requirement: .openspec.yaml の stories フィールドから Storybook embed を生成する
ビルドスクリプトは Change の `.openspec.yaml` に `stories:` フィールドが存在する場合、各ストーリーの Storybook iframe embed を Change 詳細ページに表示しなければならない（SHALL）。

#### Scenario: stories フィールドが存在する場合
- **WHEN** `.openspec.yaml` に `stories:` フィールドが存在し、1件以上のストーリー ID が列挙されている
- **THEN** Change 詳細ページの「関連コンポーネント」セクションに各ストーリーの `<iframe>` が表示される
- **THEN** iframe の `src` は `https://storybook.asunaroblog.net/iframe.html?id=<story-id>&viewMode=story` 形式になっている

#### Scenario: stories フィールドが存在しない場合
- **WHEN** `.openspec.yaml` に `stories:` フィールドが存在しない、または空配列である
- **THEN** Change 詳細ページに「関連コンポーネント」セクションは表示されない

#### Scenario: 複数のストーリーが列挙されている場合
- **WHEN** `.openspec.yaml` の `stories:` に複数のストーリー ID が列挙されている
- **THEN** Change 詳細ページに各ストーリーの iframe が列挙された順番で表示される
