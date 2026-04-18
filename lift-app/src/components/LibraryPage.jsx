import { useState } from 'react';
import { IconSearch, IconPlus } from './Icons';
import { EXERCISES } from '../data';

export default function LibraryPage() {
  const [q, setQ]         = useState('');
  const [group, setGroup] = useState('All');
  const groups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

  const filtered = EXERCISES.filter(e =>
    (group === 'All' || e.group === group) &&
    (q === '' || e.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Exercises</h1>
          <div className="page-sub">{EXERCISES.length} exercises · 12 custom</div>
        </div>
        <button className="btn btn-primary"><IconPlus size={13} /> New exercise</button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '10px 14px',
        }}>
          <IconSearch size={14} style={{ color: 'var(--text-3)' }} />
          <input
            placeholder="Search 142 exercises…"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontSize: 14,
            }}
          />
          <span className="mono" style={{
            fontSize: 11, color: 'var(--text-4)',
            padding: '2px 6px', border: '1px solid var(--border-2)', borderRadius: 4,
          }}>⌘K</span>
        </div>
        <div className="tabs">
          {groups.map(g => (
            <button key={g} className={`tab ${group === g ? 'active' : ''}`} onClick={() => setGroup(g)}>{g}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="ex-list">
          <div style={{
            display: 'grid', gridTemplateColumns: '44px 1fr 120px 100px 30px',
            gap: 14, padding: '10px 18px',
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
            color: 'var(--text-4)', fontWeight: 500,
            borderBottom: '1px solid var(--border)',
          }}>
            <div></div>
            <div>Exercise</div>
            <div>Equipment</div>
            <div style={{ textAlign: 'right' }}>Best e1RM</div>
            <div></div>
          </div>
          {filtered.map((e) => (
            <div key={e.id} className="ex-row">
              <div style={{
                width: 34, height: 34, borderRadius: 7,
                background: 'repeating-linear-gradient(45deg, var(--surface-2), var(--surface-2) 3px, var(--surface-3) 3px, var(--surface-3) 6px)',
                border: '1px solid var(--border)',
              }} />
              <div>
                <div className="name">{e.name}</div>
                <div className="sub">{e.group}</div>
              </div>
              <div className="text-3" style={{ fontSize: 12 }}>{e.equip}</div>
              <div className="mono" style={{ fontSize: 13, textAlign: 'right', color: 'var(--text-2)' }}>
                {e.bestE1RM} <span style={{ color: 'var(--text-4)', fontSize: 11 }}>lb</span>
              </div>
              <div style={{ color: 'var(--text-4)', fontSize: 16, textAlign: 'center' }}>→</div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
              No exercises match "{q}"
            </div>
          )}
        </div>
      </div>
    </>
  );
}
