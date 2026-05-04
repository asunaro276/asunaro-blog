## ADDED Requirements

### Requirement: 3カラムグリッドフッター
フッターは `2fr 1fr 1fr` の3カラムグリッドで構成する。左からブランド・カテゴリ・Elsewhere の各セクションを配置する。背景色は `--bg-2`。

#### Scenario: フッターが表示される
- **WHEN** ページのフッターを表示する
- **THEN** ロゴと説明文（ブランドセクション）が左端（2fr）に表示される
- **THEN** Category・Elsewhere の2カラムがその右に続く
- **THEN** 最下部に `© Asunaro` コピーライトが `JetBrains Mono` 11px で表示される

#### Scenario: モバイルでフッターを表示する
- **WHEN** モバイル（768px 未満）でフッターを表示する
- **THEN** 3カラムが縦積みに変わる
