/* eslint-disable */
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light"
}/*EDITMODE-END*/;

function App(){
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const isDark = tweaks.theme === 'dark';
  const themeClass = isDark ? 'theme-dark' : 'theme-light';
  const v = window.VariantFinal;

  return (
    <>
      <DesignCanvas
        title="asunaroblog — Rebrand"
        subtitle="Forest green を軸にした暖かみのある編集デザイン"
      >
        <DCSection id="final" title="Refined Editorial" subtitle="forest green palette">
          <DCArtboard id="home"     label="トップ（記事一覧）" width={1320} height={2400}>
            <v.Home theme={themeClass} />
          </DCArtboard>
          <DCArtboard id="post"     label="記事詳細"          width={1320} height={2200}>
            <v.Post theme={themeClass} />
          </DCArtboard>
          <DCArtboard id="category" label="カテゴリ一覧"      width={1320} height={1900}>
            <v.Category theme={themeClass} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks" defaultPosition={{ right: 24, bottom: 24 }}>
        <TweakSection title="Theme">
          <TweakRadio
            label="カラーテーマ"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'Light' },
              { value: 'dark',  label: 'Dark' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Palette" subtitle="ベース色を中心に設計">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
            <span style={{ width: 28, height: 28, borderRadius: 6, background: isDark ? 'oklch(0.78 0.10 145)' : 'oklch(0.46 0.09 155)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12, color: '#eee', fontWeight: 500 }}>{isDark ? 'Sage' : 'Forest'}</span>
              <span style={{ fontSize: 10, color: '#999' }}>{isDark ? 'Pairs with deep forest tint' : 'Earthy green for warm paper'}</span>
            </div>
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
