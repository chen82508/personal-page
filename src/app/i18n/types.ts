import { DOCUMENT, InjectionToken, inject } from '@angular/core';
import { HighlightIcon, HighlightLink } from '../ui/highlight-card';
import { Status } from '../ui/status-tag';
import { Employment, JobKey, TechTier } from './stack';

export type Lang = 'zh' | 'en';

export interface Highlight {
  index: string;
  status: Status;
  label: string;
  icon: HighlightIcon;
  title: string;
  body: string;
  delay: string;
  links?: HighlightLink[];
}

export interface Job {
  /** 對應 stack.ts 的 ROLE_STACKS（任職月份與使用的技術） */
  key: JobKey;
  period: string;
  company: string;
  role: string;
  project: string;
  /** 這段經歷最具代表性的成果數字，例如「2 週 → 3 天」 */
  headline: { value: string; label: string };
  points: string[];
}

/** 單複數不同的單位（中文兩者相同） */
export interface Unit {
  one: string;
  other: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external: boolean;
}

export interface SiteContent {
  htmlLang: string;
  meta: { title: string; description: string };
  /** 切換到另一個語言的連結（相對於 base href） */
  switcher: { current: string; other: string; otherLang: string; href: string };
  /** 本頁相對於 base href 的路徑，用來組出頁內錨點 */
  homePath: string;
  newTab: string;
  hero: {
    status: string;
    /** 每一行由不可斷開的片段組成，片段之間不加空白 */
    headline: string[][];
    tagline: string;
    comment: string;
  };
  about: { title: string; html: string };
  highlights: { title: string; items: Highlight[] };
  experience: {
    title: string;
    projectLabel: string;
    detailsLabel: string;
    earlierLabel: string;
    /** 篩選列的前綴，例如「篩選：」 */
    filterLabel: string;
    clearLabel: string;
    /** 每段經歷技術清單的 aria-label */
    stackLabel: string;
    /** 甘特總覽：aria-label 與圖例 */
    timeline: { label: string } & Record<Employment, string>;
    jobs: Job[];
    education: { school: string; years: string };
    languages: { name: string; level: string }[];
  };
  skills: {
    title: string;
    intro: string;
    tiers: Record<TechTier, { title: string; note: string }>;
    units: { year: Unit; month: Unit; role: Unit };
    /** 選取技術後，列出經歷的標題 */
    usedIn: string;
  };
  contact: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    location: string;
  };
}

export const CONTACTS: ContactLink[] = [
  {
    label: 'Email',
    value: 'chen82508@gmail.com',
    href: 'mailto:chen82508@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/chen82508',
    href: 'https://github.com/chen82508',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'in/kaitochen-15800326ta',
    href: 'https://www.linkedin.com/in/kaitochen-15800326ta/',
    external: true,
  },
];

/** 依網址判斷語言：base href 之後以 en 開頭為英文版，其餘為中文版 */
export function detectLang(doc: Document): Lang {
  const base = new URL(doc.baseURI).pathname;
  const path = doc.location.pathname;
  const rel = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, '');
  return /^en(\/|$)/.test(rel) ? 'en' : 'zh';
}

export const SITE_LANG = new InjectionToken<Lang>('SITE_LANG', {
  providedIn: 'root',
  factory: () => detectLang(inject(DOCUMENT)),
});
