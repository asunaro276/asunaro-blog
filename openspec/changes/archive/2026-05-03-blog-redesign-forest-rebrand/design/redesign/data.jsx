// Sample data lifted from the live blog screenshots so the mocks feel real.
const POSTS = [
  {
    id: "001",
    date: "2025.12.24",
    cat: "CODE",
    title: "レビューは観点をコメントしてから依頼する",
    desc: "コードレビューは早く返すのではなく、まず観点を共有してから依頼すると往復が少ない。チームで運用してみた所感とテンプレ。",
    tags: ["コードレビュー", "開発プロセス", "チーム開発"],
    img: "laptop-with-sticky-notes",
  },
  {
    id: "002",
    date: "2025.03.02",
    cat: "CODE",
    title: "Cursor の Cline on VSCode を比較した話",
    desc: "実装エージェント系を業務で使い分けるならどっち。各々の癖と、向いているタスクの整理。",
    tags: ["開発生産性"],
    img: "cursor-cube",
  },
  {
    id: "003",
    date: "2025.01.28",
    cat: "BUSINESS",
    title: "D-Plus Tokyo #10 で登壇したLT感想戦",
    desc: "「学びを進化させる生成AIの活用方法発表LT会」。発表後、控室で交わした議論メモ。",
    tags: ["登壇", "勉強会"],
    img: "d-plus-flyer",
  },
  {
    id: "004",
    date: "2025.01.28",
    cat: "CODE",
    title: "Amplifyを初めて使うときに、Terraformとの違いでハマった話",
    desc: "IaC観点でAmplifyを触るとここで詰まる、というメモ。",
    tags: ["フロントエンド", "AWS"],
    img: "aws-amplify",
  },
  {
    id: "005",
    date: "2024.12.09",
    cat: "OTHER",
    title: "1日休むパワーを認識する",
    desc: "休日の使い方ひとつで翌週の出力が変わる。自分用のチェックリスト。",
    tags: ["生活"],
    img: "abstract-particles",
  },
  {
    id: "006",
    date: "2024.12.05",
    cat: "OTHER",
    title: "若手エンジニアのための交流LTナイト",
    desc: "「初めての勉強会に登壇して話を聞いた話」セミナー参加録。",
    tags: ["登壇"],
    img: "ltnight-poster",
  },
  {
    id: "007",
    date: "2024.12.03",
    cat: "BUSINESS",
    title: "アーキテクチャConference 2024 行ってきた",
    desc: "「アーキテクチャ Conference 2024」に行ってきた。セッション参加録。",
    tags: ["アーキテクチャ", "参加録", "イベント"],
    img: "arch-conf-2024",
  },
  {
    id: "008",
    date: "2024.10.28",
    cat: "CODE",
    title: "個人ブログを移行するならAstro が最強だと思う",
    desc: "Next.js から Astro に移行した。何が良くなり、何を失ったか。",
    tags: ["フロントエンド", "Astro", "React"],
    img: "astro-logo",
  },
  {
    id: "009",
    date: "2024.07.31",
    cat: "BUSINESS",
    title: "Zendesk Showcase Tokyo 2024 に行ってきた! セミナー参加録",
    desc: "Zendesk Showcase Tokyo 2024 のレポートと、CSの未来について感じたこと。",
    tags: ["参加録"],
    img: "zendesk-showcase",
  },
  {
    id: "010",
    date: "2024.06.27",
    cat: "OTHER",
    title: "PlateUpのシステム開発で生産性…ボロボロ",
    desc: "ゲーム『PlateUp!』の話。チームで遊んだら設計の話になった。",
    tags: ["勉強会", "ゲーム"],
    img: "plateup-game",
  },
];

const TAGS = [
  ["登壇録", 4], ["開発生産性", 3], ["アジャイル開発", 4],
  ["プロジェクト", 16], ["AWS", 3], ["DDD", 2], ["コードレビュー", 1],
  ["フロントエンド", 5], ["参加録", 6], ["生活", 4],
];

const ARCHIVE = [
  ["2025-12", 1],["2025-3", 1],["2025-1", 2],["2024-12", 3],["2024-10", 1],
  ["2024-7", 1],["2024-6", 2],["2023-11", 1],["2023-10", 2],["2023-6", 2],
];

const NAV = [
  { id:"home", label:"HOME"     },
  { id:"code", label:"CODE"     },
  { id:"biz",  label:"BUSINESS" },
  { id:"math", label:"MATH"     },
  { id:"other",label:"OTHER"    },
];

const PROFILE = {
  name: "あすなろ",
  bio: "広告代理店で働いているWebエンジニアの個人ブログです。エンジニアとして自分の知見を残しつつ、人生楽しく生きるためのヒントを発信しています。",
  github: "asunaro",
  x: "asunaro",
};

// Article body (post detail) — placeholder content keeps the same shape as the live post.
const ARTICLE = {
  ...POSTS[0],
  hero: "laptop-with-sticky-notes",
  toc: [
    { id: "intro", label: "はじめに" },
    { id: "ctx",   label: "自分が観点を理解しているかを確認する" },
    { id: "share", label: "レビュー観点について同意を取る" },
    { id: "reqd",  label: "誰もがレビューする側の心境に寄り添えるか" },
    { id: "fail",  label: "失敗例 / バランスの取り方" },
    { id: "end",   label: "おわりに" },
  ],
  body: [
    { kind:"p", text:"レビューは観点を共有してから依頼するのが、結局一番ラクだと最近強く思っている。「観点」とは、レビュアーが何を確認すべきかという視点のことで、これが共有されていないとレビューはほぼ確実に空転する。" },
    { kind:"p", text:"コードレビューを依頼するときに、変更点だけを伝えてしまうのは典型的な失敗パターンだ。「ここを直しました、見てください」だけだと、レビュアーは「何を見ればいいのか」「どこに注目すればいいのか」を毎回ゼロから推測することになる。" },
    { kind:"h2", text:"自分が観点を理解しているかを確認する" },
    { kind:"p", text:"そもそも依頼する側が観点を理解していなければ、レビュアーに伝わるはずがない。私はPRを出す前に、自分でセルフレビューをしながら次の3点を意識している。" },
    { kind:"ul", items:["何を確認してほしいのか", "どの粒度で見るのが適切か", "見落としていそうな点はどこか"] },
    { kind:"h2", text:"レビュー観点について同意を取る" },
    { kind:"p", text:"観点が明確になったら、それを文章にしてPRの冒頭に書く。レビュアーはそれを読んで「OK、これだけ見ればいいのね」と納得してから読み始められる。「ここはまだ自信がない」と書いておくと、コメントが集まりやすいし、議論の方向性も収束しやすい。" },
    { kind:"q", text:"観点のないレビュー依頼は、地図のない旅と同じ。誰もが目的地に辿り着けない。" },
    { kind:"h2", text:"誰もがレビューする側の心境に寄り添えるか" },
    { kind:"p", text:"レビュアーは時間を割いて見てくれている。「観点を共有する」というのは、その時間を尊重するという意思表示でもある。観点を書くという小さな手間で、レビュアーの認知負荷は劇的に下がる。" },
    { kind:"h2", text:"失敗例 / バランスの取り方" },
    { kind:"p", text:"とはいえ、観点を細かく書きすぎると今度は依頼者が疲れる。観点は5項目以内、長くても3行までを目安にしている。「すべての変更点を見て」は逆効果なので避けたい。" },
    { kind:"h2", text:"おわりに" },
    { kind:"p", text:"観点を書くのに最初の30秒だけ慣れが必要だが、慣れてしまえばPR作成の一部として自然になる。チーム全体で実験してみてほしい。" },
  ],
};

// Category pages
const CATEGORIES = {
  code:  { label: "CODE",     desc: "技術・エンジニアリングに関する記事", count: 24 },
  biz:   { label: "BUSINESS", desc: "仕事・キャリアにまつわる記事",       count: 16 },
  math:  { label: "MATH",     desc: "数学・統計に関する記事",             count: 4  },
  other: { label: "OTHER",    desc: "その他、生活・趣味・思考",           count: 12 },
};

window.BlogData = { POSTS, TAGS, ARCHIVE, NAV, PROFILE, ARTICLE, CATEGORIES };
