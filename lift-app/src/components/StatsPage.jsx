import { BENCH_HISTORY, BODYWEIGHT_HISTORY } from '../data';

function LineChart({ data, getY, height = 240, color = 'var(--accent)', prIdx = -1 }) {
  const values = data.map(getY);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const padTop    = (max - min) * 0.15;
  const padBottom = (max - min) * 0.15;
  const yMax  = max + padTop;
  const yMin  = min - padBottom;
  const range = yMax - yMin || 1;
  const w = 100;
  const h = height;

  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - yMin) / range) * h;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
  const fill = `${path} L${w},${h} L0,${h} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(yMin + range * (1 - t)));

  return (
    <div style={{ position: 'relative', height: h + 30, marginLeft: 44, marginRight: 8 }}>
      <div style={{
        position: 'absolute', left: -44, top: 0, bottom: 30, width: 40,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        fontSize: 10, color: 'var(--text-4)', textAlign: 'right', paddingRight: 8,
      }}>
        {ticks.map((t, i) => <div key={i} className="mono">{t}</div>)}
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none"
        style={{ display: 'block', overflow: 'visible' }}>
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1="0" x2={w} y1={t * h} y2={t * h}
            stroke="var(--border)" strokeWidth="0.25" strokeDasharray="0.8,0.8" />
        ))}
        <defs>
          <linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0"    />
          </linearGradient>
        </defs>
        <path d={fill} fill="url(#gfill)" />
        <path d={path} fill="none" stroke={color} strokeWidth="1.5"
          strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === prIdx ? 2.5 : 1.2}
            fill={i === prIdx ? 'var(--pr)' : color}
            stroke={i === pts.length - 1 ? 'var(--bg)' : 'none'} strokeWidth="0.6"
            vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--text-4)' }}>
        {data.map((d, i) => (
          <div key={i} className="mono" style={{
            fontWeight: i === data.length - 1 ? 600 : 400,
            color: i === data.length - 1 ? 'var(--text-2)' : undefined,
          }}>{d.date}</div>
        ))}
      </div>
    </div>
  );
}

export default function StatsPage() {
  const lifts = [
    { name: 'Bench Press',    e1rm: 237, delta: '+22', active: true  },
    { name: 'Back Squat',     e1rm: 335, delta: '+28', active: false },
    { name: 'Deadlift',       e1rm: 425, delta: '+35', active: false },
    { name: 'Overhead Press', e1rm: 152, delta: '+8',  active: false },
    { name: 'Barbell Row',    e1rm: 215, delta: '+12', active: false },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Progress</h1>
          <div className="page-sub">8-week view · Upper / Lower 4x</div>
        </div>
        <div className="tabs">
          <button className="tab">4 wk</button>
          <button className="tab active">8 wk</button>
          <button className="tab">12 wk</button>
          <button className="tab">All</button>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-label">Big Four total</div>
          <div className="stat-value mono">1,149</div>
          <div className="stat-meta"><span className="up">↑ 85 lb</span> since Feb 23</div>
        </div>
        <div className="stat">
          <div className="stat-label">Avg weekly volume</div>
          <div className="stat-value mono">54.6k</div>
          <div className="stat-meta"><span className="up">↑ 12.4%</span> trend</div>
        </div>
        <div className="stat">
          <div className="stat-label">Bodyweight</div>
          <div className="stat-value mono">188.4</div>
          <div className="stat-meta"><span className="up">↑ 4.2 lb</span> since Feb</div>
        </div>
        <div className="stat">
          <div className="stat-label">Consistency</div>
          <div className="stat-value mono">96<span style={{ fontSize: 18, color: 'var(--text-3)', marginLeft: 2 }}>%</span></div>
          <div className="stat-meta">23 of 24 planned</div>
        </div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: '1fr 320px' }}>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Bench Press</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                <div className="mono" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.03em' }}>237</div>
                <div className="text-3" style={{ fontSize: 12 }}>lb estimated 1RM</div>
                <div className="chip pr" style={{ marginLeft: 8 }}>+22 · 8wk</div>
              </div>
            </div>
            <div className="tabs">
              <button className="tab active">e1RM</button>
              <button className="tab">Top set</button>
              <button className="tab">Volume</button>
            </div>
          </div>
          <div className="card-body" style={{ padding: '24px 20px 20px' }}>
            <LineChart data={BENCH_HISTORY} getY={d => d.e1rm} prIdx={BENCH_HISTORY.length - 1} color="var(--accent)" />
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">All lifts</div>
            <div className="text-3 text-sm">e1RM</div>
          </div>
          <div>
            {lifts.map((l, i) => (
              <div key={i} style={{
                padding: '14px 20px',
                borderBottom: i < lifts.length - 1 ? '1px solid var(--border)' : 'none',
                background: l.active ? 'var(--surface-2)' : 'transparent',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{l.name}</div>
                  <div className="mono" style={{ fontSize: 15, fontWeight: 500 }}>{l.e1rm}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--success)' }}>↑ {l.delta} lb</div>
                  <div style={{ fontSize: 11, color: 'var(--text-4)' }}>8 weeks</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Bodyweight</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <div className="mono" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.03em' }}>188.4</div>
              <div className="text-3" style={{ fontSize: 12 }}>lb · avg 7d</div>
              <div className="chip accent" style={{ marginLeft: 8 }}>↑ 4.2 · 8wk</div>
            </div>
          </div>
          <div className="tabs">
            <button className="tab active">Weight</button>
            <button className="tab">Body fat</button>
            <button className="tab">Measurements</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: '24px 20px 20px' }}>
          <LineChart data={BODYWEIGHT_HISTORY} getY={d => d.v} color="#8b5cf6" />
        </div>
      </div>
    </>
  );
}
