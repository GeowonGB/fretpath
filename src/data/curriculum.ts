export type DrillKind =
  | 'strum-trainer'
  | 'chord-change-timer'
  | 'tempo-ladder'
  | 'song-of-the-week'
  | 'fingerpicking-patterns'
  | 'scale-box'
  | 'play-along'
  | 'record-yourself'
  | 'ear-check';

export interface Drill {
  kind: DrillKind;
  title: string;
  description: string;
}

export interface RoadmapStage {
  id: string; // matches the stage id used in the data registry
  order: number;
  title: string;
  timeframe: string;
  tagline: string;
  goals: string[];
  lessons: string[]; // chapter titles to author, in order
  drills: Drill[];
  passCriteria: string; // human-readable; the real rule lives in gating.ts
  dailyMinutes: number;
}

export interface Habit {
  id: string;
  title: string;
  detail: string;
}

export const roadmap: RoadmapStage[] = [
  {
    id: 'stage-1',
    order: 1,
    title: 'Foundations',
    timeframe: 'First few days',
    tagline: 'Know your guitar, sit right, tune up.',
    goals: ['Name every part of the guitar', 'Hold it with good posture', 'Tune all six strings', 'Read chord diagrams and tabs'],
    lessons: ['Anatomy of the Guitar', 'Posture and Holding the Guitar', 'The Pick and Your First Sounds', 'String Names and Numbers', 'Tuning Your Guitar', 'Frets and Notes on the Fretboard', 'Reading Chord Diagrams and Tabs', 'Care, Strings and Practice Habits'],
    drills: [{ kind: 'ear-check', title: 'String name quiz', description: 'Name random strings until you hit ten in a row.' }],
    passCriteria: 'Pass the 70% test, or finish 80% of chapters. Players who already know the basics can test out.',
    dailyMinutes: 15,
  },
  {
    id: 'stage-2',
    order: 2,
    title: 'Fix Your Strumming',
    timeframe: 'Weeks 1 to 4',
    tagline: 'Strumming is the engine of everything.',
    goals: [
      'Keep the hand moving down-up like a pendulum, even when missing strings',
      'Strum one chord steadily at 60 BPM',
      'Play the pattern D, D-U, U-D-U cleanly',
    ],
    lessons: [
      'Why strumming comes first',
      'The pendulum motion: down-up without stopping',
      'Strumming one chord at 60 BPM',
      'Reading strum patterns (arrows and counting)',
      'The pattern D, D-U, U-D-U',
      'Accents, muting and dynamics',
      'Troubleshooting a messy right hand',
    ],
    drills: [
      { kind: 'strum-trainer', title: 'Strum trainer', description: 'Metronome plus animated arrows. Start at 60 BPM on one chord.' },
      { kind: 'tempo-ladder', title: 'Tempo ladder', description: 'Raise the BPM by 5 only after 4 clean bars at the current speed.' },
    ],
    passCriteria: 'Play the target pattern for 8 clean bars at 60 BPM (self-check or mic), plus the quiz.',
    dailyMinutes: 20,
  },
  {
    id: 'stage-3',
    order: 3,
    title: 'Open Chords',
    timeframe: 'Months 1 to 2',
    tagline: 'Learn the chords one at a time, then learn to change.',
    goals: [
      'Play Em, Am, C, G, D, A, E and Dm cleanly',
      'Fingertips close to the fret, thumb behind the neck',
      'Switch between two chords every 4 beats for a full minute',
    ],
    lessons: ['Em and Am', 'D and A', 'E and Dm', 'C and G', 'Fingertip and thumb technique', 'Clean chord changes', 'Two-chord change drills', 'Getting through finger pain'],
    drills: [
      { kind: 'chord-change-timer', title: 'One-minute chord changes', description: 'Pick two chords, switch every 4 beats for 60 seconds, and count clean changes.' },
      { kind: 'ear-check', title: 'Chord ear check', description: 'The app plays a chord, you name it. The mic also checks your chord.' },
    ],
    passCriteria: 'Play each chord cleanly and reach the target clean changes per minute for 3 chord pairs.',
    dailyMinutes: 20,
  },
  {
    id: 'stage-4',
    order: 4,
    title: 'Songs and Rhythm',
    timeframe: 'Months 2 to 4',
    tagline: 'Songs are the real practice.',
    goals: [
      'Learn one song per week using only chords you know',
      'Change chords in time, with the beat',
      'Start the F chord and its easy barre version',
    ],
    lessons: ['How to learn a song in a week', 'Common progressions: I-IV-V and I-V-vi-IV', 'Strumming patterns for different songs', 'Capo basics', 'The F chord: the first big wall', 'Easy F, then the full barre', 'Playing along with a backing track'],
    drills: [
      { kind: 'song-of-the-week', title: 'Song of the week', description: 'A weekly plan: day-by-day steps to learn one song from the chords you know.' },
      { kind: 'play-along', title: 'Backing track play-along', description: 'Loop a slow backing track and play along.' },
    ],
    passCriteria: 'Finish 4 songs from the song list and pass the stage test. F chord attempt logged.',
    dailyMinutes: 25,
  },
  {
    id: 'stage-5',
    order: 5,
    title: 'Fingerpicking and Scales',
    timeframe: 'Months 4 to 8',
    tagline: 'Thumb on the bass, fingers on top, and your first solos.',
    goals: [
      'Play basic fingerpicking patterns: thumb on bass, fingers on the upper strings',
      'Learn the minor pentatonic scale, one position first, then the others',
      'Play along with real recordings',
    ],
    lessons: ['Fingerpicking hand position', 'Pattern 1: thumb and three fingers', 'Pattern 2: alternating bass', 'Minor pentatonic: position 1', 'Minor pentatonic: positions 2 to 5', 'Hammer-ons, pull-offs and slides', 'Playing along with recordings'],
    drills: [
      { kind: 'fingerpicking-patterns', title: 'Fingerpicking patterns', description: 'Animated tab with a slow metronome and loop controls.' },
      { kind: 'scale-box', title: 'Pentatonic box trainer', description: 'Highlight the scale on the fretboard and play it up and down.' },
      { kind: 'play-along', title: 'Real recordings', description: 'Slow down a recording, find the key, and play along.' },
    ],
    passCriteria: 'Play 2 fingerpicking patterns and the position 1 pentatonic at a set tempo, plus the stage test.',
    dailyMinutes: 30,
  },
  {
    id: 'stage-6',
    order: 6,
    title: 'Theory and Your Own Style',
    timeframe: '8 months onward',
    tagline: 'Understand why it works, then make your own.',
    goals: [
      'Know how chords are built and how keys work',
      'Understand why songs use progressions like I-V-vi-IV',
      'Improvise and write small riffs and progressions',
      'Record yourself and review it',
    ],
    lessons: ['How chords are built', 'Major and minor keys', 'Why progressions work', 'Improvising over a progression', 'Writing a riff', 'Writing a chord progression', 'Recording and reviewing yourself'],
    drills: [
      { kind: 'record-yourself', title: 'Record and review', description: 'Record a take on-device only, listen back, and write one note on what to fix.' },
      { kind: 'ear-check', title: 'Progression ear training', description: 'Hear a progression and name the numerals.' },
    ],
    passCriteria: 'Write and record a short original progression or riff, plus the theory test.',
    dailyMinutes: 30,
  },
];

export const habits: Habit[] = [
  { id: 'h1', title: 'Short daily practice beats weekend binges', detail: 'Fifteen to twenty minutes every day builds more than one three-hour session a week.' },
  { id: 'h2', title: 'Always slow down', detail: "If you can't play it slowly, you can't play it fast. Lower the tempo until it is clean." },
  { id: 'h3', title: 'Keep your guitar visible, on a stand', detail: 'If it is in sight, you will pick it up more often than if it lives in the case.' },
  { id: 'h4', title: 'Check your guitar setup', detail: 'Strings set too high make everything harder. A bad setup can make you think you are bad.' },
  { id: 'h5', title: 'Stick to one source', detail: 'Pick one course or method and finish it instead of hopping between ten tutorials.' },
];

export const expectations =
  'A decent player can be built in about a year of consistent practice. Sounding professional takes years, but playing should feel enjoyable from about month 2 or 3.';
