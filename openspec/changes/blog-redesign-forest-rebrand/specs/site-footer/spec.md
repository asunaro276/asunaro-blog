## ADDED Requirements

### Requirement: 4カラムグリッドフッター
フッターは `2fr 1fr 1fr 1fr` の4カラムグリッドで構成する。左からブランド・カテゴリ・Elsewhere・Newsletter の各セクションを配置する。背景色は `--bg-2`。

#### Scenario: フッターが表示される
- **WHEN** ページのフッターを表示する
- **THEN** ロゴと説明文（ブランドセクション）が左端に表示される
- **THEN** Category・Elsewhere・Newsletter の3カラムがその右に続く
- **THEN** 最下部にコピーライトと "built with Astro · Newt CMS" が `JetBrains Mono` 11px で表示される

#### Scenario: モバイルでフッターを表示する
- **WHEN** モバイル（768px 未満）でフッターを表示する
- **THEN** 4カラムが縦積みに変わる
