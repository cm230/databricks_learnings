import { useState, useEffect } from 'react';
import Sidebar        from './components/Sidebar';
import HomePage       from './components/HomePage';
import WorkoutPage    from './components/WorkoutPage';
import HistoryPage    from './components/HistoryPage';
import StatsPage      from './components/StatsPage';
import LibraryPage    from './components/LibraryPage';
import PRCelebration  from './components/PRCelebration';
import { EXERCISES }  from './data';

export default function App() {
  const [page,   setPage]   = useState('workout');
  const [pr,     setPR]     = useState(null);
  const [layout, setLayout] = useState('table');

  useEffect(() => {
    const saved = localStorage.getItem('lift_page');
    if (saved) setPage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('lift_page', page);
  }, [page]);

  const triggerPR = (exercise, set) => {
    const info = EXERCISES.find(e => e.id === exercise.exId);
    setPR({ weight: set.weight, reps: set.reps, exName: info.name });
  };

  let content;
  if      (page === 'home')    content = <HomePage    onStart={() => setPage('workout')} onNav={setPage} />;
  else if (page === 'workout') content = <WorkoutPage layout={layout} onTriggerPR={triggerPR} />;
  else if (page === 'history') content = <HistoryPage />;
  else if (page === 'stats')   content = <StatsPage   />;
  else if (page === 'library') content = <LibraryPage />;

  return (
    <div className="app">
      <Sidebar page={page} onNav={setPage} />
      <div className="main">
        <div className="main-inner">
          {content}
        </div>
      </div>
      {pr && <PRCelebration prData={pr} onClose={() => setPR(null)} />}
    </div>
  );
}
