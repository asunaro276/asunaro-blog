## Requirements

### Requirement: KaTeX による数式レンダリング
記事本文中の LaTeX 数式記法を KaTeX でレンダリングする。インライン数式とブロック数式の両方に対応する。

#### Scenario: インライン数式を表示する
- **WHEN** 記事本文に `$...$` または `\(...\)` で囲まれた数式が含まれる
- **THEN** KaTeX によりインライン数式としてレンダリングされる

#### Scenario: ブロック数式を表示する
- **WHEN** 記事本文に `$$...$$` または `[...]` で囲まれた数式が含まれる
- **THEN** KaTeX によりブロック（display）数式としてレンダリングされる

#### Scenario: コードブロック内の数式は無視される
- **WHEN** `<code>` タグ内に `$` 記号が含まれる
- **THEN** KaTeX はその部分をレンダリングしない（`ignoredTags: ['code']`）

#### Scenario: 不正な数式でもページがクラッシュしない
- **WHEN** 不正な LaTeX 記法が記事に含まれる
- **THEN** エラーをスローせず（`throwOnError: false`）、元の記法文字列をそのまま表示する
