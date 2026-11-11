import { DOCUMENT, InjectionToken, inject } from '@angular/core';
import { ContactIcon } from '../ui/contact-icon';
import { DemoMedia } from '../ui/demo-button';
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
  /** 示範動畫：按下按鈕才在對話框中載入 */
  demo?: DemoMedia;
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

export interface Project {
  key: string;
  title: string;
  /** 委託單位；任職公司從 job 對應的經歷取得 */
  client: string;
  body: string;
  /** 在網站上可以親自操作的路徑 */
  tryIt: string;
  /** 對應的正職經歷：專案卡片與經歷互相以錨點連結 */
  job: JobKey;
  /** 示範動畫（public/projects/），按下按鈕才在對話框中載入 */
  media: DemoMedia;
  href: string;
  tech: string[];
}

/** 單複數不同的單位（中文兩者相同） */
export interface Unit {
  one: string;
  other: string;
}

export interface ContactLink {
  /** 畫面上以圖示呈現，文字只給螢幕閱讀器 */
  label: string;
  icon: ContactIcon;
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
  /** 開啟示範動畫對話框的按鈕，以及對話框的關閉按鈕 */
  demo: { label: string; close: string };
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
    /** 經歷下方連到作品集的前綴，例如「相關作品：」 */
    relatedLabel: string;
    /** 相關作品之間的分隔，例如「、」 */
    relatedSeparator: string;
    /** 甘特總覽：aria-label 與圖例 */
    timeline: { label: string } & Record<Employment, string>;
    jobs: Job[];
    education: { school: string; years: string };
    languages: { name: string; level: string }[];
  };
  projects: {
    title: string;
    intro: string;
    /** 「試試看：」等前綴 */
    tryLabel: string;
    visitLabel: string;
    stackLabel: string;
    items: Project[];
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
    icon: 'mail',
    value: 'chen82508@gmail.com',
    href: 'mailto:chen82508@gmail.com',
    external: false,
  },
  {
    label: 'GitHub',
    icon: 'github',
    value: 'github.com/chen82508',
    href: 'https://github.com/chen82508',
    external: true,
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
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
