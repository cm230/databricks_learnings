import { useMemo, useEffect } from 'react';
import { IconTrophy } from './Icons';

function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      left:  Math.random() * 100,
      delay: Math.random() * 0.5,
      dur:   2.5 + Math.random() * 2,
      color: ['#f5c542', '#3b82f6', '#e8e6e1', '#8b5cf6', '#4ade80'][i % 5],
      rot:   Math.random() * 360,
    })), []);

  return (
    <div className="confetti">
      {pieces.map((p, i) => (
        <i key={i} style={{
          left:              `${p.left}%`,
          animationDuration: `${p.dur}s`,
          animationDelay:    `${p.delay}s`,
          background:        p.color,
          transform:         `rotate(${p.rot}deg)`,
        }} />
      ))}
    </div>
  );
}

export default function PRCelebration({ prData, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="pr-celebrate" onClick={onClose}>
      <Confetti />
      <div className="pr-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'grid', placeItems: 'center', marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--pr-dim)', color: 'var(--pr)',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 0 0 6px rgba(245,197,66,0.06)',
          }}>
            <IconTrophy size={28} stroke={1.5} />
          </div>
        </div>
        <div className="pr-kicker">New Personal Record</div>
        <div className="pr-title">{prData.weight} × {prData.reps}</div>
        <div className="pr-exercise">{prData.exName}</div>
        <div className="pr-stats">
          <div>
            <div className="pr-stat-label">e1RM</div>
            <div className="pr-stat-value mono">{Math.round(prData.weight * (1 + prData.reps / 30))}</div>
            <div className="pr-stat-delta mono">+12 lb</div>
          </div>
          <div>
            <div className="pr-stat-label">Top set</div>
            <div className="pr-stat-value mono">{prData.weight}</div>
            <div className="pr-stat-delta mono">+5 lb</div>
          </div>
          <div>
            <div className="pr-stat-label">Cycle</div>
            <div className="pr-stat-value mono">#3</div>
            <div className="pr-stat-delta mono">Week 8</div>
          </div>
        </div>
        <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={onClose}>
          Keep lifting
        </button>
      </div>
    </div>
  );
}
