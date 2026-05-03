type YearMonthData = {
  year: number;
  month: number;
  count: number;
  value: string;
};

type Props = {
  yearmonths: YearMonthData[];
};

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export function ArchiveHeatmap({ yearmonths }: Props) {
  const yearMap = new Map<number, Map<number, YearMonthData>>();
  for (const ym of yearmonths) {
    if (!yearMap.has(ym.year)) yearMap.set(ym.year, new Map());
    yearMap.get(ym.year)!.set(ym.month, ym);
  }

  const maxCount = Math.max(0, ...yearmonths.map(ym => ym.count));
  const years = Array.from(yearMap.keys()).sort((a, b) => b - a);

  function getBg(count: number): string {
    if (count === 0) return 'var(--bg-2)';
    const ratio = Math.min(count / Math.max(maxCount, 1), 1);
    return `color-mix(in oklch, var(--accent) ${Math.round(ratio * 80 + 20)}%, var(--bg-2))`;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', color: 'var(--fg-3)', textTransform: 'uppercase' as const }}>
          Archive
        </span>
        <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'JetBrains Mono, monospace' }}>by month</span>
      </div>

      <p style={{ margin: '0 0 14px', fontSize: 11.5, color: 'var(--fg-3)', lineHeight: 1.7 }}>
        色の濃さは月ごとの投稿数。クリックでその月の記事一覧へ。
      </p>

      {years.map(year => {
        const monthMap = yearMap.get(year)!;
        const yearTotal = Array.from(monthMap.values()).reduce((s, ym) => s + ym.count, 0);
        return (
          <div key={year} data-heatmap-year={year.toString()} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg)', fontFamily: 'Noto Serif JP, serif' }}>
                {year}
              </span>
              <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'JetBrains Mono, monospace' }}>
                {yearTotal} entries
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
              {MONTHS.map(month => {
                const ym = monthMap.get(month);
                const count = ym?.count ?? 0;
                const ymValue = `${year}-${month}`;
                const has = count > 0;
                return (
                  <a
                    key={`${year}-${month}`}
                    href={has ? `/yearmonth/${ymValue}/1` : undefined}
                    data-heatmap-cell={ymValue}
                    title={has ? `${year}.${String(month).padStart(2, '0')} · ${count} 件` : undefined}
                    style={{
                      aspectRatio: '1' as const,
                      borderRadius: 4,
                      background: getBg(count),
                      cursor: has ? 'pointer' : 'default',
                      display: 'grid',
                      placeItems: 'center',
                      color: has ? (count >= 2 ? 'var(--bg)' : 'var(--fg)') : 'var(--fg-3)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10,
                      opacity: has ? 1 : 0.45,
                      textDecoration: 'none',
                    }}
                  >
                    {String(month).padStart(2, '0')}
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}

      <div data-heatmap-legend="true" style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--fg-3)' }}>少</span>
        {[20, 40, 60, 80].map(pct => (
          <div
            key={pct}
            data-legend-chip={pct.toString()}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: `color-mix(in oklch, var(--accent) ${pct}%, var(--bg-2))`,
            }}
          />
        ))}
        <span style={{ fontSize: 10, color: 'var(--fg-3)' }}>多</span>
      </div>
    </div>
  );
}

export default ArchiveHeatmap;
