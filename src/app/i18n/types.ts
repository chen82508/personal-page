import { DOCUMENT, InjectionToken, inject } from '@angular/core';
import { HighlightIcon, HighlightLink } from '../ui/highlight-card';
import { Status } from '../ui/status-tag';

export type Lang = 'zh' | 'en';

export type Highlight = {
  index: string;
  status: Status;
  label: string;
  icon: HighlightIcon;
  title: string;
  body: string;
  delay: string;
  links?: HighlightLink[];
};

export type Job = {
  period: string;
  company: string;
  role: string;
  project: string;
  points: string[];
};

export type SkillGroup = {
  index: string;
  title: string;
  items: string[];
  delay: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
  external: boolean;
};

export type SiteContent = {
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
    jobs: Job[];
    education: { school: string; years: string };
    languages: { name: string; level: string }[];
  };
  skills: { title: string; groups: SkillGroup[] };
  contact: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    location: string;
  };
};

export const CONTACTS: ContactLink[] = [
  { label: 'Email', value: 'chen82508@gmail.com', href: 'mailto:chen82508@gmail.com', external: false },
  { label: 'GitHub', value: 'github.com/chen82508', href: 'https://github.com/chen82508', external: true },
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
