export type SoftwareProjectId = 'speaklab' | 'road-report' | 'zbxp';
export type SoftwareProject = {
  id: SoftwareProjectId; name: string; preview: string; focus: string; summary: string; technologies: readonly string[];
  contributions: readonly string[]; outcomes: readonly string[]; challenge: string; github: string | null;
  demo: { youtubeId: string; url: string } | null; color: string;
};
// Marc's original supplied resume is the source of contributions and outcomes.
// See docs/SOFTWARE_PROJECT_DATA.md. These are reported results, not new benchmarks.
export const softwareProjects: readonly SoftwareProject[] = [
  {
    id: 'speaklab', preview: '/previews/speaklab.svg', name: 'SpeakLab AI', focus: 'Speech → insight', color: '#91cfc2',
    summary: 'A speech-practice app that turns recorded speeches into transcription and personalized feedback.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'OpenAI API', 'Railway'],
    contributions: ['Built the recording, transcription and personalized speech-feedback workflow.', 'Developed analysis across pacing, pauses, filler words and vocabulary.'],
    challenge: 'Turning recorded speech into useful feedback while keeping the response fast enough for repeated practice.',
    outcomes: ['150+ recorded speeches analyzed across 10+ metrics.', 'Feedback delivered in under 2.5 seconds.'],
    github: 'https://github.com/BigZ509/speaklab', demo: null,
  },
  {
    id: 'road-report', preview: '/previews/road-report.svg', name: 'Road Report', focus: 'Voice → safer roads', color: '#e8bf83',
    summary: 'A road-hazard reporting workflow that classifies voice reports and groups nearby hazards to reduce duplicate processing.',
    technologies: ['TypeScript', 'React', 'Next.js', 'TigerData', 'ElevenLabs', 'REST APIs'],
    contributions: ['Built a weighted phrase classifier for five hazard categories, including noisy voice reports.', 'Implemented 0.3-mile clustering and geohashing for nearby reports.', 'Built a confirm-before-submit REST flow with idempotency to prevent duplicate submissions.'],
    challenge: 'Interpreting noisy spoken reports while handling repeated submissions and nearby reports of the same hazard.',
    outcomes: ['92% classification accuracy across 100+ reports.', 'Approximately 67% less geospatial processing through clustering and geohashing.'],
    github: null, demo: { youtubeId: 'mj-jhV5Joho', url: 'https://youtu.be/mj-jhV5Joho' },
  },
  {
    id: 'zbxp', preview: '/previews/zbxp.svg', name: 'ZBXP', focus: 'Small tasks → momentum', color: '#c1b4e3',
    summary: 'A gamified productivity app with tasks, quests, XP, streaks, Pomodoro sessions and guilds.',
    technologies: ['React', 'JavaScript', 'Supabase', 'PostgreSQL', 'REST APIs'],
    contributions: ['Built task tracking and gamification features around XP, streaks and quests.', 'Modeled users, tasks, guilds and sessions in PostgreSQL/Supabase.', 'Implemented leaderboard updates and Pomodoro session tracking.'],
    challenge: 'Keeping progression, task activity and shared leaderboards consistent across users and sessions.',
    outcomes: ['50+ users; 50+ tasks and 5+ Pomodoro hours recorded.', 'Average leaderboard refresh of 1.8 seconds.'],
    github: null, demo: null,
  },
];
export type SoftwareInteraction = { selected: SoftwareProjectId | null; attention: SoftwareProjectId | null; disabled: boolean; onHover: (id: SoftwareProjectId | null) => void; onSelect: (id: SoftwareProjectId) => void };
