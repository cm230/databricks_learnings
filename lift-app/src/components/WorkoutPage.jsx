import { useState, useEffect } from 'react';
import { IconPlus, IconCheck, IconMore, IconTimer, IconPause, IconTrophy } from './Icons';
import { TODAYS_WORKOUT, exById } from '../data';

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function SetsTable({ exercise, onToggleSet, onTriggerPR }) {
  const warmupCount = (setIdx) =>
    exercise.sets.slice(0, setIdx).filter(s => s.type === 'warmup').length;

  return (
    <div className="sets">
      <div className="sets-row head">
        <div>Set</div>
        <div>Previous</div>
        <div style={{ textAlign: 'center' }}>Weight</div>
        <div style={{ textAlign: 'center' }}>Reps</div>
        <div style={{ textAlign: 'center' }}>RPE</div>
        <div></div>
      </div>
      {exercise.sets.map((set, i) => (
        <div key={i} className={`sets-row ${set.done ? 'done' : ''}`}>
          <div className={`set-num ${set.type === 'warmup' ? 'warmup' : ''}`}>
            {set.type === 'warmup' ? 'W' : i - warmupCount(i) + 1}
          </div>
          <div className="prev-cell mono">{set.prev || '—'}</div>
          <div style={{ position: 'relative' }}>
            <input
              className={`set-input mono ${set.weight == null ? 'placeholder' : ''}`}
              style={{ textAlign: 'center' }}
              defaultValue={set.weight != null ? set.weight : ''}
              placeholder={set.prev ? set.prev.split(' × ')[0] : '—'}
            />
            {set.isPR && !set.done && (
              <div style={{
                position: 'absolute', top: -5, right: -5,
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--pr)', border: '2px solid var(--surface)',
              }} />
            )}
          </div>
          <div>
            <input
              className={`set-input mono ${set.reps == null ? 'placeholder' : ''}`}
              style={{ textAlign: 'center' }}
              defaultValue={set.reps != null ? set.reps : ''}
              placeholder={set.prev ? set.prev.split(' × ')[1] : '—'}
            />
          </div>
          <div>
            <input
              className="set-input mono"
              style={{ textAlign: 'center', color: 'var(--text-3)' }}
              placeholder="—"
            />
          </div>
          <button
            className={`check-btn ${set.done ? 'done' : ''}`}
            onClick={() => {
              if (set.isPR && !set.done) onTriggerPR(exercise, set);
              else onToggleSet(exercise, i);
            }}
          >
            {set.done && <IconCheck size={14} stroke={2.5} />}
          </button>
        </div>
      ))}
      <button className="add-set">
        <IconPlus size={12} /> Add set
      </button>
    </div>
  );
}

function SetsStepper({ exercise, onToggleSet, onTriggerPR }) {
  const active = exercise.sets.findIndex(s => !s.done);
  const activeSet = exercise.sets[active] || exercise.sets[exercise.sets.length - 1];
  const workingIdx = exercise.sets
    .slice(0, active === -1 ? exercise.sets.length : active + 1)
    .filter(s => s.type === 'working').length;

  return (
    <div style={{ padding: '18px 22px 22px' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {exercise.sets.map((s, i) => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: s.done ? 'var(--success)' : i === active ? 'var(--accent)' : 'var(--surface-2)',
            transition: 'background .2s',
          }} />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)', fontWeight: 500 }}>
            {activeSet?.type === 'warmup' ? 'Warmup' : `Set ${workingIdx}`} of {exercise.sets.filter(s => s.type === 'working').length}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 4 }}>
            Last: <span className="mono" style={{ color: 'var(--text-2)' }}>{activeSet?.prev || '—'}</span>
          </div>
        </div>
        {activeSet?.isPR && (
          <div className="chip pr"><IconTrophy size={11} /> PR attempt</div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        {[
          { label: 'Weight (lb)', key: 'weight' },
          { label: 'Reps',        key: 'reps'   },
        ].map(({ label, key }) => (
          <div key={key}>
            <div style={{ fontSize: 11, color: 'var(--text-4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="icon-btn" style={{ width: 34, height: 34, background: 'var(--surface-2)' }}>−</button>
              <input
                className="mono"
                defaultValue={activeSet?.[key] ?? activeSet?.prev?.split(' × ')[key === 'weight' ? 0 : 1]}
                style={{
                  flex: 1, fontSize: 26, fontWeight: 500, textAlign: 'center',
                  background: 'var(--surface-2)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px', color: 'var(--text)',
                  letterSpacing: '-0.02em',
                }}
              />
              <button className="icon-btn" style={{ width: 34, height: 34, background: 'var(--surface-2)' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary btn-lg"
        style={{ width: '100%' }}
        onClick={() => {
          if (activeSet?.isPR && !activeSet.done) onTriggerPR(exercise, activeSet);
          else if (active !== -1) onToggleSet(exercise, active);
        }}
      >
        <IconCheck size={15} stroke={2.5} /> Log set
      </button>

      <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {exercise.sets.filter(s => s.done).map((s, i) => (
          <div key={i} className="mono" style={{
            fontSize: 12, color: 'var(--text-2)',
            padding: '5px 10px', background: 'var(--surface-2)', borderRadius: 5,
          }}>{s.weight} × {s.reps}</div>
        ))}
      </div>
    </div>
  );
}

export default function WorkoutPage({ layout, onTriggerPR }) {
  const [workout, setWorkout] = useState(TODAYS_WORKOUT);
  const [elapsed, setElapsed] = useState(37 * 60 + 12);
  const [rest, setRest] = useState({
    active: true, remaining: 87, total: 180, exName: 'Barbell Bench Press',
  });

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed(e => e + 1);
      setRest(r => r.active && r.remaining > 0 ? { ...r, remaining: r.remaining - 1 } : r);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const totalSets = workout.exercises.reduce((s, e) => s + e.sets.length, 0);
  const doneSets  = workout.exercises.reduce((s, e) => s + e.sets.filter(x => x.done).length, 0);
  const totalVol  = workout.exercises.reduce((s, e) =>
    s + e.sets.filter(x => x.done).reduce((a, b) => a + (b.weight || 0) * (b.reps || 0), 0), 0);

  const onToggleSet = (exercise, i) => {
    setWorkout(w => ({
      ...w,
      exercises: w.exercises.map(e =>
        e === exercise
          ? { ...e, sets: e.sets.map((s, j) => j === i ? { ...s, done: !s.done } : s) }
          : e
      ),
    }));
    setRest({ active: true, remaining: exercise.rest, total: exercise.rest, exName: exById(exercise.exId).name });
  };

  return (
    <>
      <div className="workout-head">
        <div>
          <h1 className="workout-title">{workout.name}</h1>
          <div className="workout-meta">
            <span>{workout.template}</span>
            <span>•</span>
            <span className="mono">{formatTime(elapsed)} elapsed</span>
            <span>•</span>
            <span className="mono">{doneSets}/{totalSets} sets</span>
            <span>•</span>
            <span className="mono">{totalVol.toLocaleString()} lb volume</span>
          </div>
        </div>
        <div className="workout-actions">
          <button className="btn btn-ghost"><IconPause size={13} /> Pause</button>
          <button className="btn btn-primary">Finish</button>
        </div>
      </div>

      <div style={{
        height: 3, background: 'var(--surface)', borderRadius: 2,
        marginBottom: 20, overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', width: `${(doneSets / totalSets) * 100}%`,
          background: 'var(--accent)', transition: 'width .3s',
        }} />
      </div>

      {workout.exercises.map((ex, i) => {
        const info = exById(ex.exId);
        const done = ex.sets.filter(s => s.done).length;
        const isActive = ex.sets.some(s => !s.done) &&
          (i === 0 || workout.exercises.slice(0, i).every(p => p.sets.every(s => s.done)));
        return (
          <div key={i} className="exercise" style={isActive ? { borderColor: 'var(--border-2)' } : {}}>
            <div className="exercise-head">
              <div style={{
                width: 28, height: 28, borderRadius: 6, background: 'var(--surface-2)',
                display: 'grid', placeItems: 'center',
                fontSize: 12, fontWeight: 600, color: 'var(--text-2)', flexShrink: 0,
              }}>{i + 1}</div>
              <div className="exercise-thumb" />
              <div>
                <div className="exercise-name">{info.name}</div>
                <div className="exercise-sub">
                  {info.group} · {info.equip} · Rest {Math.floor(ex.rest / 60)}:{String(ex.rest % 60).padStart(2, '0')}
                </div>
              </div>
              <div className="exercise-head-right">
                <div className="chip">{done}/{ex.sets.length}</div>
                <button className="icon-btn"><IconMore /></button>
              </div>
            </div>
            {layout === 'stepper' && isActive ? (
              <SetsStepper exercise={ex} onToggleSet={onToggleSet} onTriggerPR={onTriggerPR} />
            ) : (
              <SetsTable exercise={ex} onToggleSet={onToggleSet} onTriggerPR={onTriggerPR} />
            )}
          </div>
        );
      })}

      <button className="btn btn-ghost" style={{ width: '100%', padding: '14px', marginTop: 10, justifyContent: 'center' }}>
        <IconPlus size={14} /> Add exercise
      </button>

      <div className={`rest-bar ${rest.active ? 'active' : ''}`}>
        <div style={{ color: rest.active ? 'var(--accent-2)' : 'var(--text-3)' }}>
          <IconTimer size={20} />
        </div>
        <div>
          <div className="rest-label">Resting · {rest.exName}</div>
          <div className="rest-time mono">{formatTime(rest.remaining)}</div>
        </div>
        <div className="rest-progress">
          <div className="rest-progress-fill" style={{ width: `${100 - (rest.remaining / rest.total) * 100}%` }} />
        </div>
        <button className="btn btn-sm btn-ghost">+ 30s</button>
        <button className="btn btn-sm btn-outline">Skip</button>
      </div>
    </>
  );
}
