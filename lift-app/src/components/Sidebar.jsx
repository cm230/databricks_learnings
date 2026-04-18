import { IconHome, IconDumbbell, IconCalendar, IconChart, IconLibrary, IconCog } from './Icons';

export default function Sidebar({ page, onNav }) {
  const items = [
    { id: 'home',    label: 'Home',           Icon: IconHome },
    { id: 'workout', label: 'Active Workout',  Icon: IconDumbbell },
    { id: 'history', label: 'History',         Icon: IconCalendar },
    { id: 'stats',   label: 'Progress',        Icon: IconChart },
    { id: 'library', label: 'Exercises',       Icon: IconLibrary },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">L</div>
        <div className="brand-name">Lift</div>
      </div>
      <div className="nav-section">Training</div>
      <div className="nav">
        {items.map(it => (
          <button
            key={it.id}
            className={`nav-item ${page === it.id ? 'active' : ''}`}
            onClick={() => onNav(it.id)}
          >
            <it.Icon />
            <span>{it.label}</span>
          </button>
        ))}
      </div>

      <div className="nav-section">Routines</div>
      <div className="nav">
        <button className="nav-item">
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--accent)', display: 'inline-block' }} />
          <span>Upper / Lower 4x</span>
        </button>
        <button className="nav-item">
          <span style={{ width: 16, height: 16, borderRadius: 4, background: '#8b5cf6', display: 'inline-block' }} />
          <span>PPL Hypertrophy</span>
        </button>
        <button className="nav-item">
          <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--text-3)', display: 'inline-block' }} />
          <span>5/3/1 BBB</span>
        </button>
      </div>

      <div className="sidebar-foot">
        <div className="avatar">MK</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Mara K.</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Week 8 · Cycle 3</div>
        </div>
        <button className="icon-btn"><IconCog /></button>
      </div>
    </aside>
  );
}
