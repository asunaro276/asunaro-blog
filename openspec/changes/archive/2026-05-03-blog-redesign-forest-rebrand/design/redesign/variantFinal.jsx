/* eslint-disable */
// Final consolidated variant — applies the user's combined preferences.
// - Top: hero feature like B2's prominence, then B3-style 3-column grid below
// - Sidebar (top): B1-style refined tags with chips
// - Archive: redesigned as a clean year/month picker (compact + scannable)
// - Post detail: no per-post author chip; suggested-posts (B2-style) included
// - Category pages: B2-style restrained category title (not B1's giant)
// - Left sidebar on post: tag list (B1/B3 style)
const { POSTS, TAGS, ARCHIVE, NAV, PROFILE, ARTICLE, CATEGORIES, ListImage } = window.Shared;

const Vroot = () => ({
  minHeight: '100%',
  background: 'var(--bg)',
  color: 'var(--fg)',
  fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
  fontSize: 14,
  lineHeight: 1.7,
});

function VHeader({ active="home" }){
  return (
    <header style={{ position:'sticky', top:0, background:'color-mix(in oklab, var(--bg) 92%, transparent)', backdropFilter:'blur(14px)', borderBottom:'1px solid var(--rule)', zIndex:10 }}>
      <div style={{ maxWidth:1320, margin:'0 auto', padding:'16px 40px', display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center', gap: 24 }}>
        <a href="#" style={{ color:'var(--fg)', textDecoration:'none', display:'flex', alignItems:'baseline', gap: 10 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight:600, fontSize: 20, letterSpacing:'-0.02em' }}>asunaro<span style={{ color:'var(--accent)' }}>blog</span></span>
          <span className="mono" style={{ fontSize: 11, color:'var(--fg-3)' }}>since 2022</span>
        </a>
        <nav style={{ display:'flex', gap: 28, justifyContent:'center' }}>
          {NAV.map(n => (
            <a key={n.id} href="#" style={{
              textDecoration:'none',
              color: active===n.id?'var(--fg)':'var(--fg-2)',
              fontWeight: 500, fontSize: 12.5, letterSpacing:'.06em', textTransform:'uppercase',
              borderBottom: active===n.id ? '1px solid var(--accent)' : '1px solid transparent',
              paddingBottom: 4
            }}>{n.label}</a>
          ))}
        </nav>
        <div style={{ justifySelf:'end', display:'flex', gap: 18, alignItems:'center' }}>
          <span className="label">SEARCH</span>
          <span className="label">RSS ↗</span>
        </div>
      </div>
    </header>
  );
}

// --- Hero (B2レベルの主張: 大きく主役感のあるフィーチャー) ---
function VHero(){
  const f = POSTS[0];
  return (
    <section style={{ borderBottom:'1px solid var(--rule)', background:'var(--bg-2)' }}>
      <div style={{ maxWidth:1320, margin:'0 auto', padding:'56px 40px 64px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', gap: 56, alignItems:'center' }}>
          <div>
            <div style={{ display:'flex', gap: 14, alignItems:'center', marginBottom: 20 }}>
              <span className="label" style={{ color:'var(--accent)' }}>FEATURED</span>
              <span className="label">{f.cat}</span>
              <span className="mono" style={{ fontSize:11, color:'var(--fg-3)' }}>{f.date}</span>
            </div>
            <h1 className="ja-serif" style={{ margin:0, fontWeight: 600, fontSize: 52, lineHeight: 1.18, letterSpacing:'-0.014em', color:'var(--fg)' }}>{f.title}</h1>
            <p className="ja" style={{ marginTop: 22, fontSize: 16, lineHeight: 1.95, color:'var(--fg-2)', maxWidth: 580 }}>{f.desc}</p>
            <div style={{ marginTop: 24, display:'flex', gap: 8, flexWrap:'wrap' }}>
              {f.tags.map(t => <span key={t} className="ja" style={{ fontSize: 11.5, color:'var(--fg-2)', padding:'4px 10px', background:'var(--bg)', borderRadius: 99 }}>#{t}</span>)}
            </div>
            <div style={{ marginTop: 28 }}>
              <a href="#" style={{ textDecoration:'none', color:'var(--fg)', borderBottom:'1px solid var(--accent)', paddingBottom: 4, fontWeight: 500 }}>本文を読む →</a>
            </div>
          </div>
          <ListImage p={f} ratio="3/2" />
        </div>
      </div>
    </section>
  );
}

// --- 「最近書いたもの」以下の3カラムカード（B3風・余白多め） ---
function VCard({ p }){
  return (
    <article style={{ display:'flex', flexDirection:'column', gap: 14 }}>
      <ListImage p={p} ratio="4/3" />
      <div style={{ display:'flex', gap: 12, alignItems:'baseline' }}>
        <span className="label">{p.cat}</span>
        <span className="mono" style={{ fontSize:11, color:'var(--fg-3)' }}>{p.date}</span>
      </div>
      <h3 className="ja-serif" style={{ margin:0, fontWeight: 600, fontSize: 18, lineHeight: 1.4, color:'var(--fg)' }}>{p.title}</h3>
      <p className="ja" style={{ margin:0, color:'var(--fg-2)', fontSize: 13, lineHeight: 1.85 }}>{p.desc}</p>
      <div className="ja" style={{ display:'flex', gap: 10, fontSize: 11, color:'var(--fg-3)' }}>
        {p.tags.map(t => <span key={t}>#{t}</span>)}
      </div>
    </article>
  );
}

// --- リファインドArchive: 年×月グリッド ---
// 年単位で折りたたみ表示。月は横並びチップ。
function ArchivePicker(){
  // ARCHIVE = [["2025-12", 1], ...] → 年ごとに集計
  const byYear = ARCHIVE.reduce((acc, [ym, c]) => {
    const [y, m] = ym.split('-');
    if (!acc[y]) acc[y] = { months: {}, total: 0 };
    acc[y].months[parseInt(m,10)] = c;
    acc[y].total += c;
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a,b) => +b - +a);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 18 }}>
      {years.map((y, idx) => {
        const { months, total } = byYear[y];
        return (
          <div key={y}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8 }}>
              <span className="ja-serif" style={{ fontSize: 18, fontWeight: 600, color: idx===0?'var(--fg)':'var(--fg-2)' }}>{y}</span>
              <span className="mono" style={{ fontSize: 11, color:'var(--fg-3)' }}>{total} entries</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap: 4 }}>
              {Array.from({length: 12}, (_, i) => i+1).map(m => {
                const c = months[m] || 0;
                const has = c > 0;
                return (
                  <div key={m} title={`${y}.${String(m).padStart(2,'0')} · ${c} 件`}
                    style={{
                      aspectRatio: '1',
                      display:'grid', placeItems:'center',
                      borderRadius: 4,
                      background: has ? `color-mix(in oklab, var(--accent) ${Math.min(80, 20+c*15)}%, var(--bg-2))` : 'var(--bg-2)',
                      color: has ? (c >= 2 ? 'var(--bg)' : 'var(--fg)') : 'var(--fg-3)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      cursor: has ? 'pointer' : 'default',
                      opacity: has ? 1 : 0.45
                    }}>
                    {String(m).padStart(2,'0')}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- Sidebar (B1の洗練されたチップ型タグ + リファインドArchive) ---
function VSidebar(){
  return (
    <aside style={{ paddingLeft: 36, borderLeft:'1px solid var(--rule)' }}>
      <div style={{ padding:'8px 0 28px' }}>
        <div className="label" style={{ marginBottom: 18 }}>About</div>
        <div className="avatar" style={{ width: 88, height: 88, marginBottom: 16 }}></div>
        <div className="ja-serif" style={{ fontWeight: 600, fontSize: 20 }}>{PROFILE.name}</div>
        <p className="ja" style={{ marginTop: 10, fontSize: 12.5, color:'var(--fg-2)', lineHeight: 1.85 }}>{PROFILE.bio}</p>
        <div style={{ display:'flex', gap: 16, marginTop: 16 }}>
          <a className="label" href="#">GITHUB ↗</a>
          <a className="label" href="#">X ↗</a>
        </div>
      </div>
      <div style={{ padding:'24px 0', borderTop:'1px solid var(--rule)' }}>
        <div className="label" style={{ marginBottom: 14 }}>Tags</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: 6 }}>
          {TAGS.map(([t,c]) => (
            <span key={t} className="ja" style={{ fontSize: 12, padding:'5px 10px', border:'1px solid var(--rule-2)', borderRadius: 99, color:'var(--fg-2)' }}>
              {t} <span className="mono" style={{ color:'var(--fg-3)' }}>{c}</span>
            </span>
          ))}
        </div>
      </div>
      <div style={{ padding:'24px 0', borderTop:'1px solid var(--rule)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 6 }}>
          <span className="label">Archive</span>
          <span className="mono" style={{ fontSize: 11, color:'var(--fg-3)' }}>by month</span>
        </div>
        <p className="ja" style={{ margin:'0 0 14px', fontSize: 11.5, color:'var(--fg-3)', lineHeight: 1.7 }}>
          色の濃さは月ごとの投稿数。クリックでその月の記事一覧へ。
        </p>
        <ArchivePicker />
        <div style={{ marginTop: 14, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
            <span className="mono" style={{ fontSize: 10, color:'var(--fg-3)' }}>少</span>
            {[0, 0.3, 0.55, 0.8].map((a,i) => (
              <span key={i} style={{
                width: 10, height: 10, borderRadius: 2,
                background: a === 0 ? 'var(--bg-2)' : `color-mix(in oklab, var(--accent) ${a*100}%, var(--bg-2))`
              }}></span>
            ))}
            <span className="mono" style={{ fontSize: 10, color:'var(--fg-3)' }}>多</span>
          </div>
          <a href="#" className="label" style={{ textDecoration:'none' }}>ALL ↗</a>
        </div>
      </div>
    </aside>
  );
}

// --- Modern pagination: prev/next as primary, page numbers as secondary ---
function Pagination({ total = 12, current = 1 }){
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i);
    else if (pages[pages.length-1] !== '…') pages.push('…');
  }
  return (
    <nav aria-label="pagination" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 24, marginTop: 72, paddingTop: 28, borderTop:'1px solid var(--rule)' }}>
      <button className="mono" style={{
        background:'transparent', border:'none', cursor:'pointer',
        color: current===1?'var(--fg-3)':'var(--fg-2)', fontSize: 12, letterSpacing:'.06em', textTransform:'uppercase',
        display:'flex', alignItems:'center', gap: 10, padding: '8px 0',
        opacity: current===1 ? 0.4 : 1
      }}>
        <span style={{ fontSize: 16 }}>←</span> Previous
      </button>
      <div style={{ display:'flex', alignItems:'center', gap: 4 }}>
        {pages.map((p, i) => p === '…' ? (
          <span key={'e'+i} style={{ width: 28, textAlign:'center', color:'var(--fg-3)', fontFamily:"'JetBrains Mono', monospace", fontSize: 12 }}>…</span>
        ) : (
          <button key={p} className="mono" style={{
            width: 32, height: 32, display:'grid', placeItems:'center',
            background: p===current ? 'var(--accent)' : 'transparent',
            color: p===current ? 'var(--bg)' : 'var(--fg-2)',
            border:'none',
            borderRadius: 6,
            fontSize: 12, fontWeight: p===current ? 600 : 400,
            cursor:'pointer'
          }}>{p}</button>
        ))}
      </div>
      <button className="mono" style={{
        background:'transparent', border:'none', cursor:'pointer',
        color:'var(--fg)', fontSize: 12, letterSpacing:'.06em', textTransform:'uppercase',
        display:'flex', alignItems:'center', gap: 10, padding: '8px 0', fontWeight: 500
      }}>
        Next <span style={{ fontSize: 16 }}>→</span>
      </button>
    </nav>
  );
}

function VFooter(){
  return (
    <footer style={{ borderTop:'1px solid var(--rule)', marginTop: 48, padding:'56px 40px 32px', background:'var(--bg-2)' }}>
      <div style={{ maxWidth:1320, margin:'0 auto', display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, fontWeight: 600, letterSpacing:'-0.02em' }}>asunaro<span style={{ color:'var(--accent)' }}>blog</span></div>
          <p className="ja" style={{ marginTop: 12, fontSize: 13, color:'var(--fg-2)', maxWidth: 380 }}>毎週、コードと考えごとを少しずつ。</p>
        </div>
        <div>
          <div className="label" style={{ marginBottom: 14 }}>Category</div>
          <ul style={{ margin:0, padding:0, listStyle:'none', fontSize: 13, lineHeight: 2, color:'var(--fg-2)' }}>
            {NAV.map(n => <li key={n.id}>{n.label}</li>)}
          </ul>
        </div>
        <div>
          <div className="label" style={{ marginBottom: 14 }}>Elsewhere</div>
          <ul style={{ margin:0, padding:0, listStyle:'none', fontSize: 13, lineHeight: 2, color:'var(--fg-2)' }}>
            <li>GitHub ↗</li><li>X ↗</li><li>RSS ↗</li>
          </ul>
        </div>
        <div>
          <div className="label" style={{ marginBottom: 14 }}>Newsletter</div>
          <p className="ja" style={{ margin:0, fontSize: 12.5, color:'var(--fg-2)' }}>月1回、書いたものをまとめてお届け。</p>
        </div>
      </div>
      <div style={{ maxWidth:1320, margin:'40px auto 0', display:'flex', justifyContent:'space-between', borderTop:'1px solid var(--rule)', paddingTop: 24 }}>
        <span className="mono" style={{ fontSize: 11, color:'var(--fg-3)' }}>© Asunaro 2026</span>
        <span className="mono" style={{ fontSize: 11, color:'var(--fg-3)' }}>built with Astro · Newt CMS</span>
      </div>
    </footer>
  );
}

/* ---- Top: B2-strength hero + B3-style 3-col grid ---- */
function VHome({ theme }){
  const rest = POSTS.slice(1);
  return (
    <div className={"surface " + theme} style={Vroot()}>
      <VHeader active="home" />
      <VHero />
      <main style={{ maxWidth: 1320, margin:'0 auto', padding:'56px 40px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns: '1fr 320px', gap: 56 }}>
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 32, paddingBottom: 14, borderBottom:'1px solid var(--rule)' }}>
              <h2 className="ja-serif" style={{ margin:0, fontWeight: 600, fontSize: 22 }}>最近書いたもの</h2>
              <span className="label">VIEW ALL →</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 36, rowGap: 56 }}>
              {rest.map(p => <VCard key={p.id} p={p} />)}
            </div>
            <Pagination total={12} current={1} />
          </div>
          <VSidebar />
        </div>
      </main>
      <VFooter />
    </div>
  );
}

/* ---- Post: 著者表示なし、左にタグ、右にTOC、下にSuggested ---- */
function VPost({ theme }){
  const a = ARTICLE;
  return (
    <div className={"surface " + theme} style={Vroot()}>
      <VHeader active="code" />
      <article>
        <div style={{ maxWidth: 880, margin:'0 auto', padding:'72px 40px 0', textAlign:'center' }}>
          <div className="label" style={{ marginBottom: 16, color:'var(--accent)' }}>{a.cat} · {a.date} · 04:32 read</div>
          <h1 className="ja-serif" style={{ margin:0, fontSize: 48, fontWeight: 600, lineHeight: 1.22, letterSpacing:'-0.012em' }}>{a.title}</h1>
          <p className="ja" style={{ marginTop: 22, fontSize: 16.5, lineHeight: 1.9, color:'var(--fg-2)', maxWidth: 680, margin:'22px auto 0' }}>{a.desc}</p>
        </div>
        <div className="ph" style={{ maxWidth:1140, margin:'48px auto 56px', aspectRatio:'21/9' }}>{a.hero}</div>
        <div style={{ maxWidth: 1320, margin:'0 auto', padding:'0 40px 40px', display:'grid', gridTemplateColumns: '180px 1fr 220px', gap: 56 }}>
          {/* Left: Tags + Share */}
          <aside style={{ position:'sticky', top: 80, alignSelf:'start' }}>
            <div className="label" style={{ marginBottom: 14 }}>Tags</div>
            <div className="ja" style={{ fontSize: 13, lineHeight: 2, color:'var(--fg-2)' }}>
              {a.tags.map(t => <div key={t}>#{t}</div>)}
            </div>
            <div style={{ marginTop: 28 }}>
              <div className="label" style={{ marginBottom: 12 }}>Share</div>
              <div className="label" style={{ lineHeight: 2 }}>X ↗<br/>LINK ↗</div>
            </div>
          </aside>
          {/* Body */}
          <div className="ja" style={{ fontSize: 16, lineHeight: 2.05, color:'var(--fg)' }}>
            {a.body.map((b,i) => {
              if (b.kind==="h2") return <h2 key={i} className="ja-serif" style={{ fontSize: 24, fontWeight: 600, marginTop: 52, marginBottom: 14, letterSpacing:'-0.005em' }}>{b.text}</h2>;
              if (b.kind==="p")  return <p key={i} style={{ margin:'0 0 22px', color:'var(--fg)' }}>{b.text}</p>;
              if (b.kind==="ul") return <ul key={i} style={{ paddingLeft: 22, margin:'0 0 22px' }}>{b.items.map(it => <li key={it} style={{ marginBottom: 6 }}>{it}</li>)}</ul>;
              if (b.kind==="q")  return (
                <blockquote key={i} style={{ margin:'32px 0', padding:'8px 0 8px 18px', borderLeft:'2px solid var(--accent)' }}>
                  <span className="ja-serif" style={{ fontSize: 18, fontStyle:'italic', color:'var(--fg)' }}>{b.text}</span>
                </blockquote>
              );
            })}
          </div>
          {/* Right: TOC (no hairlines, just left bar) */}
          <aside style={{ position:'sticky', top: 80, alignSelf:'start' }}>
            <div className="label" style={{ marginBottom: 14 }}>Contents</div>
            <ol style={{ margin:0, padding:0, listStyle:'none' }}>
              {a.toc.map((t,i) => (
                <li key={t.id} style={{
                  padding:'7px 0 7px 12px',
                  borderLeft: i===1?'2px solid var(--accent)':'2px solid transparent',
                  fontSize: 12.5,
                  color: i===1?'var(--fg)':'var(--fg-2)',
                  fontWeight: i===1?500:400
                }}>
                  <span className="ja">{t.label}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
        <section style={{ borderTop:'1px solid var(--rule)', padding:'56px 40px 40px', marginTop: 24 }}>
          <div style={{ maxWidth: 1320, margin:'0 auto' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 28 }}>
              <h2 className="ja-serif" style={{ margin:0, fontSize: 22, fontWeight: 600 }}>Suggested for you</h2>
              <span className="label">VIEW ALL →</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 32 }}>
              {[POSTS[7], POSTS[6], POSTS[3]].map(p => <VCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      </article>
      <VFooter />
    </div>
  );
}

/* ---- Category: B2-style restrained title (not B1's giant) ---- */
function VCategory({ theme }){
  const c = CATEGORIES.code;
  const list = POSTS.filter(p=>p.cat==="CODE").concat(POSTS.filter(p=>p.cat==="CODE")).slice(0,9);
  return (
    <div className={"surface " + theme} style={Vroot()}>
      <VHeader active="code" />
      <section style={{ borderBottom:'1px solid var(--rule)', background:'var(--bg-2)' }}>
        <div style={{ maxWidth:1320, margin:'0 auto', padding:'48px 40px 36px' }}>
          <div className="label" style={{ marginBottom: 12 }}>Category</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'end', gap: 32 }}>
            <div>
              <h1 className="ja-serif" style={{ margin:0, fontWeight: 600, fontSize: 56, lineHeight: 1.05, letterSpacing:'-0.02em' }}>
                {c.label}<span style={{ color:'var(--accent)' }}>.</span>
              </h1>
              <p className="ja" style={{ margin:'12px 0 0', color:'var(--fg-2)', fontSize: 14, lineHeight: 1.85, maxWidth: 560 }}>{c.desc}</p>
            </div>
            <div className="mono" style={{ fontSize: 12, color:'var(--fg-3)', textAlign:'right' }}>
              <div>{c.count} entries</div>
              <div style={{ marginTop: 4 }}>updated 2025.12.24</div>
            </div>
          </div>
          <div style={{ display:'flex', gap: 8, marginTop: 28, flexWrap:'wrap' }}>
            {Object.entries(CATEGORIES).map(([k,v]) => (
              <span key={k} className="ja" style={{ fontSize: 12, padding:'6px 12px', border:'1px solid '+(k==='code'?'var(--fg)':'var(--rule-2)'), background: k==='code'?'var(--fg)':'transparent', color: k==='code'?'var(--bg)':'var(--fg-2)', fontWeight: k==='code'?600:400, borderRadius: 4 }}>
                {v.label} · {v.count}
              </span>
            ))}
          </div>
        </div>
      </section>
      <main style={{ maxWidth: 1320, margin:'0 auto', padding:'56px 40px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns: '1fr 320px', gap: 56 }}>
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 36, rowGap: 56 }}>
              {list.map((p,i) => <VCard key={i} p={p} />)}
            </div>
            <Pagination total={4} current={1} />
          </div>
          <VSidebar />
        </div>
      </main>
      <VFooter />
    </div>
  );
}

window.VariantFinal = { Home: VHome, Post: VPost, Category: VCategory };
