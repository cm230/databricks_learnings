export const TODAY = new Date(2026, 3, 18); // April 18, 2026

export const EXERCISES = [
  { id: 'bp',    name: 'Barbell Bench Press',     group: 'Chest',     equip: 'Barbell',    bestE1RM: 225 },
  { id: 'sq',    name: 'Back Squat',               group: 'Legs',      equip: 'Barbell',    bestE1RM: 315 },
  { id: 'dl',    name: 'Conventional Deadlift',    group: 'Back',      equip: 'Barbell',    bestE1RM: 405 },
  { id: 'ohp',   name: 'Overhead Press',           group: 'Shoulders', equip: 'Barbell',    bestE1RM: 145 },
  { id: 'row',   name: 'Barbell Row',              group: 'Back',      equip: 'Barbell',    bestE1RM: 205 },
  { id: 'incdb', name: 'Incline Dumbbell Press',   group: 'Chest',     equip: 'Dumbbell',   bestE1RM: 165 },
  { id: 'pull',  name: 'Pull-Up',                  group: 'Back',      equip: 'Bodyweight', bestE1RM: 245 },
  { id: 'dip',   name: 'Dip',                      group: 'Chest',     equip: 'Bodyweight', bestE1RM: 225 },
  { id: 'lat',   name: 'Lat Pulldown',             group: 'Back',      equip: 'Cable',      bestE1RM: 175 },
  { id: 'rdl',   name: 'Romanian Deadlift',        group: 'Legs',      equip: 'Barbell',    bestE1RM: 285 },
  { id: 'lp',    name: 'Leg Press',                group: 'Legs',      equip: 'Machine',    bestE1RM: 540 },
  { id: 'curl',  name: 'Dumbbell Curl',            group: 'Arms',      equip: 'Dumbbell',   bestE1RM: 50  },
  { id: 'tri',   name: 'Tricep Pushdown',          group: 'Arms',      equip: 'Cable',      bestE1RM: 80  },
  { id: 'lr',    name: 'Lateral Raise',            group: 'Shoulders', equip: 'Dumbbell',   bestE1RM: 30  },
  { id: 'calf',  name: 'Standing Calf Raise',      group: 'Legs',      equip: 'Machine',    bestE1RM: 250 },
  { id: 'hip',   name: 'Hip Thrust',               group: 'Legs',      equip: 'Barbell',    bestE1RM: 315 },
];

export const TODAYS_WORKOUT = {
  name: 'Push Day — Week 8',
  template: 'Upper/Lower · Push',
  startedAt: '4:12 PM',
  exercises: [
    {
      exId: 'bp',
      rest: 180,
      sets: [
        { type: 'warmup',  weight: 135, reps: 8, done: true,  prev: '135 × 8' },
        { type: 'warmup',  weight: 165, reps: 5, done: true,  prev: '165 × 5' },
        { type: 'working', weight: 205, reps: 5, done: true,  prev: '200 × 5' },
        { type: 'working', weight: 205, reps: 5, done: true,  prev: '200 × 5' },
        { type: 'working', weight: 210, reps: 5, done: false, prev: '205 × 4', isPR: true },
        { type: 'working', weight: null, reps: null, done: false, prev: '205 × 4' },
      ],
    },
    {
      exId: 'incdb',
      rest: 120,
      sets: [
        { type: 'working', weight: 70, reps: 10, done: false, prev: '70 × 10' },
        { type: 'working', weight: 70, reps: 10, done: false, prev: '70 × 9'  },
        { type: 'working', weight: 70, reps: 8,  done: false, prev: '70 × 8'  },
      ],
    },
    {
      exId: 'ohp',
      rest: 120,
      sets: [
        { type: 'working', weight: 115, reps: 6, done: false, prev: '115 × 6' },
        { type: 'working', weight: 115, reps: 6, done: false, prev: '115 × 5' },
        { type: 'working', weight: 115, reps: 5, done: false, prev: '110 × 6' },
      ],
    },
    {
      exId: 'dip',
      rest: 90,
      sets: [
        { type: 'working', weight: 45, reps: 10, done: false, prev: '45 × 10' },
        { type: 'working', weight: 45, reps: 8,  done: false, prev: '45 × 9'  },
        { type: 'working', weight: 45, reps: 8,  done: false, prev: '45 × 8'  },
      ],
    },
    {
      exId: 'tri',
      rest: 60,
      sets: [
        { type: 'working', weight: 60, reps: 12, done: false, prev: '60 × 12' },
        { type: 'working', weight: 60, reps: 12, done: false, prev: '55 × 12' },
        { type: 'working', weight: 55, reps: 12, done: false, prev: '55 × 12' },
      ],
    },
  ],
};

export const WORKOUT_HISTORY = [
  { date: '2026-02-23', name: 'Push A',  dur: 68, vol: 14820, pr: false },
  { date: '2026-02-25', name: 'Pull A',  dur: 72, vol: 15420, pr: true  },
  { date: '2026-02-27', name: 'Legs A',  dur: 81, vol: 22140, pr: false },
  { date: '2026-03-02', name: 'Push A',  dur: 65, vol: 15020, pr: false },
  { date: '2026-03-04', name: 'Pull A',  dur: 70, vol: 15780, pr: false },
  { date: '2026-03-06', name: 'Legs A',  dur: 78, vol: 22840, pr: true  },
  { date: '2026-03-09', name: 'Push B',  dur: 72, vol: 15220, pr: false },
  { date: '2026-03-11', name: 'Pull B',  dur: 74, vol: 16200, pr: false },
  { date: '2026-03-13', name: 'Legs B',  dur: 80, vol: 23100, pr: false },
  { date: '2026-03-16', name: 'Push A',  dur: 70, vol: 15620, pr: true  },
  { date: '2026-03-18', name: 'Pull A',  dur: 72, vol: 16420, pr: false },
  { date: '2026-03-20', name: 'Legs A',  dur: 82, vol: 23420, pr: false },
  { date: '2026-03-23', name: 'Push B',  dur: 68, vol: 15840, pr: false },
  { date: '2026-03-25', name: 'Pull B',  dur: 75, vol: 16680, pr: true  },
  { date: '2026-03-27', name: 'Legs B',  dur: 84, vol: 23780, pr: false },
  { date: '2026-03-30', name: 'Push A',  dur: 71, vol: 16120, pr: false },
  { date: '2026-04-01', name: 'Pull A',  dur: 73, vol: 16920, pr: false },
  { date: '2026-04-03', name: 'Legs A',  dur: 83, vol: 24100, pr: true  },
  { date: '2026-04-06', name: 'Push B',  dur: 70, vol: 16420, pr: false },
  { date: '2026-04-08', name: 'Pull B',  dur: 76, vol: 17220, pr: false },
  { date: '2026-04-10', name: 'Legs B',  dur: 85, vol: 24420, pr: false },
  { date: '2026-04-13', name: 'Push A',  dur: 72, vol: 16640, pr: false },
  { date: '2026-04-15', name: 'Pull A',  dur: 74, vol: 17420, pr: true  },
  { date: '2026-04-17', name: 'Legs A',  dur: 86, vol: 24760, pr: false },
];

export const BENCH_HISTORY = [
  { date: 'Feb 23', e1rm: 215, top: '200 × 5' },
  { date: 'Mar 02', e1rm: 217, top: '200 × 5' },
  { date: 'Mar 09', e1rm: 220, top: '205 × 5' },
  { date: 'Mar 16', e1rm: 222, top: '205 × 5' },
  { date: 'Mar 23', e1rm: 218, top: '200 × 5' },
  { date: 'Mar 30', e1rm: 225, top: '205 × 5' },
  { date: 'Apr 06', e1rm: 228, top: '205 × 5' },
  { date: 'Apr 13', e1rm: 230, top: '205 × 5' },
  { date: 'Apr 18', e1rm: 237, top: '210 × 5', pr: true },
];

export const BODYWEIGHT_HISTORY = [
  { date: 'Feb 23', v: 184.2 },
  { date: 'Mar 02', v: 184.8 },
  { date: 'Mar 09', v: 185.4 },
  { date: 'Mar 16', v: 185.9 },
  { date: 'Mar 23', v: 186.2 },
  { date: 'Mar 30', v: 186.8 },
  { date: 'Apr 06', v: 187.4 },
  { date: 'Apr 13', v: 187.9 },
  { date: 'Apr 18', v: 188.4 },
];

export const exById = (id) => EXERCISES.find(e => e.id === id);
