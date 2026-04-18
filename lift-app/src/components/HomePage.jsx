import { IconTrophy, IconPlay } from './Icons';
import { TODAYS_WORKOUT, WORKOUT_HISTORY, BENCH_HISTORY, exById } from '../data';

function Sparkline({ data, height = 36, color = 'var(--accent)' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage({ onStart, onNav }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Saturday, April 18</h1>
          <div className="page-sub">Week 8 of 12 · Upper / Lower 4x · On schedule</div>
        </div>
        <button className="btn btn-primary btn-lg" onClick={onStart}>
          <IconPlay size={14} /> Start workout
        </button>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-label">This week</div>
          <div className="stat-value mono">3<span style={{ fontSize: 18, color: 'var(--text-3)', marginLeft: 4 }}>/4</span></div>
          <div className="stat-meta">1 session remaining</div>
        </div>
        <div className="stat">
          <div className="stat-label">Weekly volume</div>
          <div className="stat-value mono">58,420</div>
          <div className="stat-meta"><span className="up">↑ 6.4%</span> vs last week</div>
        </div>
        <div className="stat">
          <div className="stat-label">Streak</div>
          <div className="stat-value mono">12<span style={{ fontSize: 18, color: 'var(--text-3)', marginLeft: 4 }}>wk</span></div>
          <div className="stat-meta">Longest · 14 weeks</div>
        </div>
        <div className="stat">
          <div className="stat-label">Bodyweight</div>
          <div className="stat-value mono">188.4</div>
          <div className="stat-meta"><span className="up">↑ 4.2 lb</span> since Feb</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Today's workout</div>
              <div className="text-3" style={{ fontSize: 12, marginTop: 3 }}>From routine · Upper / Lower 4x</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onStart}>Open</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {TODAYS_WORKOUT.exercises.map((ex, i) => {
              const info = exById(ex.exId);
              const working = ex.sets.filter(s => s.type === 'working');
              return (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '36px 1fr auto',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 22px',
                  borderBottom: i < TODAYS_WORKOUT.exercises.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: 'var(--surface-2)',
                    display: 'grid', placeItems: 'center',
                    fontSize: 12, fontWeight: 600, color: 'var(--text-2)',
                  }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{info.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
                      {working.length} working sets · {info.group}
                    </div>
                  </div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--text-2)' }}>
                    {working[0]?.weight ? `${working[0].weight} × ${working[0].reps}` : '—'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="card-head">
              <div className="card-title">Recent PRs</div>
              <button className="btn btn-sm btn-outline" onClick={() => onNav('stats')}>All</button>
            </div>
            <div style={{ padding: '4px 0' }}>
              {[
                { ex: 'Barbell Row',  set: '205 × 5', date: 'Apr 15', delta: '+5 lb'  },
                { ex: 'Leg Press',    set: '540 × 8', date: 'Apr 3',  delta: '+20 lb' },
                { ex: 'Deadlift',     set: '385 × 3', date: 'Mar 25', delta: '+10 lb' },
              ].map((pr, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 22px',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--pr-dim)', color: 'var(--pr)',
                    display: 'grid', placeItems: 'center',
                  }}><IconTrophy size={16} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{pr.ex}</div>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>{pr.set}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontSize: 12, color: 'var(--pr)', fontWeight: 500 }}>{pr.delta}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 2 }}>{pr.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title">Bench press e1RM</div>
              <div className="chip accent">↑ 22 lb · 8wk</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                <div className="mono" style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.03em' }}>237</div>
                <div className="text-3" style={{ fontSize: 12 }}>lb estimated</div>
              </div>
              <div style={{ height: 50 }}>
                <Sparkline data={BENCH_HISTORY.map(d => d.e1rm)} height={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
