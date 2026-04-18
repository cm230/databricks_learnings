import { IconTrophy } from './Icons';
import { WORKOUT_HISTORY } from '../data';

export default function HistoryPage() {
  const todayISO = '2026-04-18';

  const start = new Date(2026, 2, 16);
  const days = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const workout = WORKOUT_HISTORY.find(w => w.date === iso);
    days.push({ d, iso, workout, isToday: iso === todayISO, isFuture: d > new Date(2026, 3, 18) });
  }

  const totalVol  = WORKOUT_HISTORY.reduce((s, w) => s + w.vol, 0);
  const totalTime = WORKOUT_HISTORY.reduce((s, w) => s + w.dur, 0);
  const totalPRs  = WORKOUT_HISTORY.filter(w => w.pr).length;

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">History</h1>
          <div className="page-sub">24 workouts · 8-week block · Upper / Lower 4x</div>
        </div>
        <div className="tabs">
          <button className="tab active">Calendar</button>
          <button className="tab">List</button>
          <button className="tab">Heatmap</button>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-label">Workouts</div>
          <div className="stat-value mono">24</div>
          <div className="stat-meta">over 8 weeks</div>
        </div>
        <div className="stat">
          <div className="stat-label">Total volume</div>
          <div className="stat-value mono">{(totalVol / 1000).toFixed(0)}k</div>
          <div className="stat-meta">lb moved</div>
        </div>
        <div className="stat">
          <div className="stat-label">Time under bar</div>
          <div className="stat-value mono">
            {Math.floor(totalTime / 60)}<span style={{ fontSize: 18, color: 'var(--text-3)', marginLeft: 4 }}>h {totalTime % 60}m</span>
          </div>
          <div className="stat-meta">3h 3m avg / week</div>
        </div>
        <div className="stat">
          <div className="stat-label">Personal records</div>
          <div className="stat-value mono" style={{ color: 'var(--pr)' }}>{totalPRs}</div>
          <div className="stat-meta">across 6 lifts</div>
        </div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">March 16 – April 19</div>
              <div className="text-3" style={{ fontSize: 12, marginTop: 3 }}>5 weeks shown</div>
            </div>
            <div className="row gap-3">
              <div className="chip accent">Workout</div>
              <div className="chip pr">PR</div>
            </div>
          </div>
          <div className="card-body">
            <div className="cal-grid" style={{ marginBottom: 8 }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} className="cal-head">{d}</div>
              ))}
            </div>
            <div className="cal-grid">
              {days.map((day, i) => {
                const cls = [
                  'cal-cell',
                  day.workout ? 'workout' : '',
                  day.workout?.pr ? 'pr' : '',
                  day.isToday ? 'today' : '',
                  day.isFuture ? 'other' : '',
                ].filter(Boolean).join(' ');
                return (
                  <div key={i} className={cls}>
                    <div className="mono" style={{ fontWeight: day.isToday ? 600 : 400, color: day.workout ? 'var(--text)' : undefined }}>
                      {day.d.getDate()}
                    </div>
                    {day.workout && (
                      <div style={{ marginTop: 4, fontSize: 10, color: day.workout.pr ? 'var(--pr)' : 'var(--accent-2)', fontWeight: 500 }}>
                        {day.workout.name}
                      </div>
                    )}
                    {day.workout && (
                      <div className="mono" style={{ marginTop: 'auto', fontSize: 10, color: 'var(--text-3)' }}>
                        {(day.workout.vol / 1000).toFixed(1)}k
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Recent sessions</div>
            <button className="btn btn-sm btn-outline">Export</button>
          </div>
          <div>
            {[...WORKOUT_HISTORY].reverse().slice(0, 8).map((w, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12,
                alignItems: 'center', padding: '12px 22px',
                borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {w.name}
                    {w.pr && <IconTrophy size={11} stroke={2} style={{ color: 'var(--pr)' }} />}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                    {w.date.slice(5)} · {w.dur}m
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--text-2)', textAlign: 'right' }}>
                  {(w.vol / 1000).toFixed(1)}k lb
                </div>
                <button className="icon-btn" style={{ color: 'var(--text-4)' }}>→</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
