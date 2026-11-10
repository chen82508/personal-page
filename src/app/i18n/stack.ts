// 技術棧與經歷的對照：與語言無關，所有語言共用。
// 熟悉度不用自評分數，而是從履歷算出可查證的數字（用了幾年、出現在幾段經歷）。
// 分層規則（stack.spec.ts 會檢查）：
//   core    — 履歷「核心技術棧」列出的技術
//   shipped — 不在核心技術棧，但用在工作經歷裡
//   other   — 只出現在履歷的技能清單，沒有對應的工作經歷
// 對照只收履歷「明確寫到」或使用者確認過的技術；後者也要補進履歷（見 docs/TODO.md）。
// 使用者確認（2026-11-10）：
//   - Git 從 iPASS 起的每段經歷都用於版控；Claude Code 從 GoCode 起用於正式專案
//   - 哈瑪星、iPASS、驊宏資通的開發語言是 C# / .NET；哈瑪星的 PTX／ArcGIS 整合屬 RESTful API
//   - Micah 的後端語言是 Python，並導入 Redis 配合主機上的資料備份作業

export type Employment = 'permanent' | 'contract' | 'partTime';

export const EMPLOYMENT_TYPES: Employment[] = ['permanent', 'contract', 'partTime'];

export type TechTier = 'core' | 'shipped' | 'other';

export const TECH_TIERS = {
  core: [
    'Python',
    'TypeScript / Node.js',
    'NestJS',
    'C# / .NET',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'Docker Compose',
    'AWS',
  ],
  shipped: [
    'FastAPI',
    'ASP.NET Core',
    'Vue.js',
    'RESTful API',
    'WebSocket',
    'SQL',
    'MSSQL',
    'Oracle',
    'BigQuery',
    'GCP Cloud SQL',
    'Alembic',
    'ETL',
    'Azure DevOps',
    'pytest',
    'TestComplete',
    'SKILL.md',
    'Git',
    'Claude Code',
  ],
  other: ['Angular', 'CLAUDE.md'],
} as const satisfies Record<TechTier, readonly string[]>;

export type TechName = (typeof TECH_TIERS)[TechTier][number];

export const TIER_ORDER: TechTier[] = ['core', 'shipped', 'other'];

export type JobKey =
  'micah' | 'gocode' | 'freelance-esg' | 'zealogics' | 'ptmb' | 'hamastar' | 'ipass' | 'azion';

export interface RoleStack {
  /** 任職期間，格式 YYYY-MM，含頭含尾 */
  start: string;
  end: string;
  /** 收進「更早的經歷」，預設收合 */
  earlier: boolean;
  /** 甘特總覽的軌道：與前一段同時進行的經歷放第二軌（1），避免長條重疊 */
  lane: 0 | 1;
  /** 任職類型：甘特總覽依此決定長條樣式（正職實心、約聘斜紋、兼職／業外虛線框） */
  employment: Employment;
  tech: TechName[];
}

export const ROLE_STACKS: Record<JobKey, RoleStack> = {
  micah: {
    start: '2026-03',
    end: '2026-11',
    earlier: false,
    lane: 1, // 2026.03 與 GoCode 同時任職
    employment: 'permanent',
    tech: [
      'Python',
      'PostgreSQL',
      'SQL',
      'Redis',
      'Alembic',
      'Docker Compose',
      'AWS',
      'SKILL.md',
      'Claude Code',
      'Git',
    ],
  },
  gocode: {
    start: '2025-12',
    end: '2026-03',
    earlier: false,
    lane: 0,
    employment: 'contract',
    tech: ['TypeScript / Node.js', 'NestJS', 'Redis', 'Kafka', 'RESTful API', 'Claude Code', 'Git'],
  },
  'freelance-esg': {
    start: '2025-07',
    end: '2025-12',
    earlier: false,
    lane: 1,
    employment: 'partTime',
    tech: [
      'Python',
      'FastAPI',
      'RESTful API',
      'PostgreSQL',
      'SQL',
      'BigQuery',
      'GCP Cloud SQL',
      'Alembic',
      'WebSocket',
      'Azure DevOps',
      'pytest',
      'Git',
    ],
  },
  zealogics: {
    start: '2023-05',
    end: '2025-09',
    earlier: false,
    lane: 0,
    employment: 'permanent',
    tech: ['C# / .NET', 'Python', 'TestComplete', 'Git'],
  },
  ptmb: {
    start: '2022-02',
    end: '2023-04',
    earlier: false,
    lane: 0,
    employment: 'permanent',
    tech: [
      'C# / .NET',
      'ASP.NET Core',
      'Vue.js',
      'TypeScript / Node.js',
      'NestJS',
      'MSSQL',
      'Oracle',
      'SQL',
      'Git',
    ],
  },
  hamastar: {
    start: '2019-08',
    end: '2022-01',
    earlier: true,
    lane: 0,
    employment: 'permanent',
    tech: ['C# / .NET', 'RESTful API', 'ETL', 'Git'],
  },
  ipass: {
    start: '2018-10',
    end: '2019-08',
    earlier: true,
    lane: 0,
    employment: 'permanent',
    tech: ['C# / .NET', 'SQL', 'Git'],
  },
  azion: {
    start: '2017-05',
    end: '2018-10',
    earlier: true,
    lane: 0,
    employment: 'permanent',
    tech: ['C# / .NET', 'MSSQL', 'Oracle', 'SQL'],
  },
};

export interface TechStat {
  name: TechName;
  tier: TechTier;
  /** 用過這項技術的月數（重疊的任期只算一次） */
  months: number;
  jobs: JobKey[];
}

export function monthIndex(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + m - 1;
}

/** 多段期間的聯集月數：兼職與正職重疊時不重複計算 */
export function coveredMonths(ranges: { start: string; end: string }[]): number {
  const months = new Set<number>();
  for (const r of ranges) {
    for (let i = monthIndex(r.start); i <= monthIndex(r.end); i++) months.add(i);
  }
  return months.size;
}

/** 依分層排列；同一層內依年資由長到短 */
export function techStats(): TechStat[] {
  const keys = Object.keys(ROLE_STACKS) as JobKey[];
  return TIER_ORDER.flatMap((tier) =>
    (TECH_TIERS[tier] as readonly TechName[])
      .map((name) => {
        const jobs = keys.filter((k) => ROLE_STACKS[k].tech.includes(name));
        return { name, tier, jobs, months: coveredMonths(jobs.map((k) => ROLE_STACKS[k])) };
      })
      .sort((a, b) => b.months - a.months || b.jobs.length - a.jobs.length),
  );
}
