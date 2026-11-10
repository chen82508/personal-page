import { CONTENT } from './content';
import { ROLE_STACKS, TECH_TIERS, coveredMonths, techStats } from './stack';
import { Lang } from './types';

describe('tech stack evidence', () => {
  const stats = techStats();

  it('should count overlapping periods once', () => {
    expect(coveredMonths([{ start: '2025-01', end: '2025-12' }])).toBe(12);
    expect(
      coveredMonths([
        { start: '2023-05', end: '2025-09' },
        { start: '2025-07', end: '2025-12' },
      ]),
    ).toBe(32);
  });

  it('should list every technology once', () => {
    const names = Object.values(TECH_TIERS).flat();
    expect(new Set(names).size).toBe(names.length);
  });

  // 分層規則：核心與實戰經驗都要能在經歷裡找到佐證；「其他工具」則沒有對應的經歷
  it('should back every core and shipped technology with at least one role', () => {
    const missing = stats.filter((s) => s.tier !== 'other' && s.jobs.length === 0);
    expect(missing.map((s) => s.name)).toEqual([]);
  });

  it('should keep other tools out of the work history', () => {
    const used = stats.filter((s) => s.tier === 'other' && s.jobs.length > 0);
    expect(used.map((s) => s.name)).toEqual([]);
  });

  it.each(Object.keys(CONTENT))('should map every job in %s to a role stack', (lang) => {
    const keys = CONTENT[lang as Lang].experience.jobs.map((j) => j.key);
    expect(keys).toEqual(Object.keys(ROLE_STACKS));
  });

  it.each(Object.keys(CONTENT))('should match role periods to the visible years in %s', (lang) => {
    for (const job of CONTENT[lang as Lang].experience.jobs) {
      const { start, end } = ROLE_STACKS[job.key];
      expect(job.period.match(/\d{4}/g)).toEqual([start.slice(0, 4), end.slice(0, 4)]);
    }
  });
});
