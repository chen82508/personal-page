import { BASE_LANG, CONTENT } from './content';
import { Lang, SiteContent } from './types';

// 語言版本一致性檢查：TypeScript 型別只保證欄位存在，這裡再確認
// 「每個語言的條目數量、連結、狀態都與基準語言相同，且沒有留空的文字」。
// 新增語言時只要登記到 CONTENT，就會自動納入以下所有檢查。

const base = CONTENT[BASE_LANG];
const others = (Object.keys(CONTENT) as Lang[]).filter((l) => l !== BASE_LANG);

/** 可以為空的欄位：homePath（基準語言在根目錄）、delay（動畫延遲 class，不是文案） */
const MAY_BE_EMPTY = new Set(['homePath', 'delay']);

/** 走訪整份內容，回傳所有空字串的路徑 */
function emptyStrings(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    const key = path.split('.').pop() ?? '';
    return value.trim() === '' && !MAY_BE_EMPTY.has(key) ? [path] : [];
  }
  if (Array.isArray(value)) return value.flatMap((v, i) => emptyStrings(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => emptyStrings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

/** 與語言無關、應該完全相同的部分（數量、識別碼、連結、狀態） */
function shape(c: SiteContent) {
  return {
    highlights: c.highlights.items.map((h) => ({
      index: h.index,
      status: h.status,
      label: h.label,
      icon: h.icon,
      delay: h.delay,
      links: (h.links ?? []).map((l) => l.href),
    })),
    jobs: c.experience.jobs.map((j) => ({ key: j.key, points: j.points.length })),
    languages: c.experience.languages.length,
    tiers: Object.keys(c.skills.tiers),
  };
}

describe('i18n content parity', () => {
  it('should register more than one language', () => {
    expect(others.length).toBeGreaterThan(0);
  });

  it.each(Object.keys(CONTENT))('should have no empty strings in %s', (lang) => {
    expect(emptyStrings(CONTENT[lang as Lang])).toEqual([]);
  });

  it.each(others)('should match the base language structure in %s', (lang) => {
    expect(shape(CONTENT[lang])).toEqual(shape(base));
  });

  it.each(others)('should keep the same company order in %s', (lang) => {
    // 公司名可翻譯，但順序與數量必須一致；以期間的西元年份對齊
    const years = (c: SiteContent) =>
      c.experience.jobs.map((j) => j.period.match(/\d{4}/g)?.join('-'));
    expect(years(CONTENT[lang])).toEqual(years(base));
  });

  it('should give every language a unique html lang, path and switcher target', () => {
    const all = Object.values(CONTENT);
    expect(new Set(all.map((c) => c.htmlLang)).size).toBe(all.length);
    expect(new Set(all.map((c) => c.homePath)).size).toBe(all.length);
    expect(new Set(all.map((c) => c.switcher.href)).size).toBe(all.length);
  });
});
