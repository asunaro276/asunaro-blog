/* eslint-disable */
// Shared bits used across B1/B2/B3
const { POSTS, TAGS, ARCHIVE, NAV, PROFILE, ARTICLE, CATEGORIES } = window.BlogData;

// Common: small list-image card (一覧で必ず画像を出す)
function ListImage({ p, ratio="4/3" }){
  return <div className="ph" style={{ aspectRatio: ratio, width:'100%' }}>{p.img}</div>;
}

window.Shared = { POSTS, TAGS, ARCHIVE, NAV, PROFILE, ARTICLE, CATEGORIES, ListImage };
