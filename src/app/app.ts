import {
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ButtonDirective } from 'primeng/button';
import { CONTENT } from './i18n/content';
import {
  EMPLOYMENT_TYPES,
  Employment,
  JobKey,
  ROLE_STACKS,
  monthIndex,
  TIER_ORDER,
  TechName,
  TechStat,
  techStats,
} from './i18n/stack';
import { CONTACTS, Job, SITE_LANG, Unit } from './i18n/types';
import { ContactIconView } from './ui/contact-icon';
import { Eyebrow } from './ui/eyebrow';
import { HighlightCard } from './ui/highlight-card';

@Component({
  selector: 'app-root',
  imports: [ButtonDirective, ContactIconView, Eyebrow, HighlightCard, NgTemplateOutlet],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly c = CONTENT[inject(SITE_LANG)];
  protected readonly contacts = CONTACTS;

  // ---- 經歷與技術棧 ----
  protected readonly stats = techStats();
  protected readonly tierGroups = TIER_ORDER.map((tier) => ({
    tier,
    text: this.c.skills.tiers[tier],
    stats: this.stats.filter((s) => s.tier === tier),
  }));
  protected readonly recentJobs = this.c.experience.jobs.filter((j) => !ROLE_STACKS[j.key].earlier);
  protected readonly earlierJobs = this.c.experience.jobs.filter((j) => ROLE_STACKS[j.key].earlier);
  protected readonly earlierRange = yearRange(this.earlierJobs.map((j) => ROLE_STACKS[j.key]));

  /** 甘特總覽：以月為單位換算成百分比位置；依時間先後決定畫出的延遲 */
  private readonly span = timelineSpan(this.c.experience.jobs.map((j) => ROLE_STACKS[j.key]));
  protected readonly ganttBars = ganttLayout(this.c.experience.jobs, this.span.start).map(
    (bar, i) => ({
      ...bar,
      left: (bar.from / this.span.months) * 100,
      width: ((bar.to - bar.from) / this.span.months) * 100,
      delay: 150 + i * 90,
    }),
  );
  protected readonly ganttYears = this.span.years.map((year) => ({
    year,
    left: ((year * 12 - this.span.start) / this.span.months) * 100,
  }));
  protected readonly employmentTypes = EMPLOYMENT_TYPES;
  /** 長條與圖例共用的樣式；group-hover 只對長條有作用 */
  protected readonly employmentStyles: Record<Employment, string> = {
    permanent: 'bg-accent-dim group-hover/bar:bg-accent-soft',
    contract: 'bg-hatch border border-current text-accent-dim group-hover/bar:text-accent-soft',
    partTime: 'border border-dashed border-accent group-hover/bar:border-accent-soft',
  };
  /** 滑過或聚焦的長條：在圖例的位置顯示公司與期間 */
  protected readonly hovered = signal<Job | null>(null);

  /** 目前選取的技術：技術棧與經歷共用，任一處點選都會篩選經歷 */
  protected readonly selected = signal<TechName | null>(null);
  protected readonly selectedStat = computed(
    () => this.stats.find((s) => s.name === this.selected()) ?? null,
  );
  /** 選取的技術用在被收合的經歷時，自動展開，避免篩選後看不到結果 */
  private readonly earlierToggled = signal(false);
  protected readonly earlierOpen = computed(
    () =>
      this.earlierToggled() ||
      (this.selectedStat()?.jobs.some((k) => ROLE_STACKS[k].earlier) ?? false),
  );

  private readonly jobsByKey = new Map(this.c.experience.jobs.map((j) => [j.key, j]));

  protected toggleTech(name: TechName): void {
    this.selected.update((cur) => (cur === name ? null : name));
  }

  protected onEarlierToggle(event: Event): void {
    this.earlierToggled.set((event.target as HTMLDetailsElement).open);
  }

  protected techOf(job: Job): readonly TechName[] {
    return ROLE_STACKS[job.key].tech;
  }

  /** 篩選中、且這段經歷沒用到選取的技術時淡化 */
  protected isDimmed(job: Job): boolean {
    const t = this.selected();
    return t !== null && !ROLE_STACKS[job.key].tech.includes(t);
  }

  protected job(key: JobKey): Job | undefined {
    return this.jobsByKey.get(key);
  }

  /** 例：3.7 年 · 2 段經歷；不滿一年時以月計 */
  protected statText(s: TechStat): string {
    const { year, month, role } = this.c.skills.units;
    const time =
      s.months < 12 ? plural(s.months, month) : plural(Math.round((s.months / 12) * 10) / 10, year);
    return `${time} · ${plural(s.jobs.length, role)}`;
  }

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // 依語言設定 <html lang>、標題與描述
    inject(DOCUMENT).documentElement.lang = this.c.htmlLang;
    inject(Title).setTitle(this.c.meta.title);
    inject(Meta).updateTag({ name: 'description', content: this.c.meta.description });

    // 捲動淡入：偏好減少動畫或不支援 IntersectionObserver 時直接全部顯示
    afterNextRender(() => {
      const els = this.host.nativeElement.querySelectorAll<HTMLElement>('.reveal');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!('IntersectionObserver' in window) || reduceMotion) {
        els.forEach((el) => el.classList.add('in-view'));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
      );
      els.forEach((el) => io.observe(el));
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}

function plural(n: number, unit: Unit): string {
  return `${n} ${n === 1 ? unit.one : unit.other}`;
}

function yearRange(ranges: { start: string; end: string }[]): string {
  const years = ranges.flatMap((r) => [r.start, r.end]).map((ym) => Number(ym.slice(0, 4)));
  return `${Math.min(...years)} – ${Math.max(...years)}`;
}

/** 整體期間（月索引起點與總月數），以及期間內每個一月的年份刻度 */
function timelineSpan(ranges: { start: string; end: string }[]) {
  const start = Math.min(...ranges.map((r) => monthIndex(r.start)));
  const end = Math.max(...ranges.map((r) => monthIndex(r.end))) + 1;
  const years: number[] = [];
  for (let y = Math.ceil(start / 12); y * 12 < end; y++) years.push(y);
  return { start, months: end - start, years };
}

/**
 * 甘特長條的月份位置（起點含、終點不含），依起點排序。
 * 同一軌上前後兩段共用一個月份時是交接（真正同時任職的經歷放在第二軌），
 * 把那個月從中間切開，長條之間才有間隙，不會連成一條。
 */
function ganttLayout(jobs: Job[], origin: number) {
  const bars = jobs
    .map((job) => {
      const r = ROLE_STACKS[job.key];
      return {
        job,
        lane: r.lane,
        employment: r.employment,
        from: monthIndex(r.start) - origin,
        to: monthIndex(r.end) - origin + 1,
      };
    })
    .sort((a, b) => a.from - b.from);
  const last = new Map<number, (typeof bars)[number]>();
  for (const bar of bars) {
    const prev = last.get(bar.lane);
    if (prev && bar.from < prev.to) {
      const mid = (bar.from + prev.to) / 2;
      prev.to = mid;
      bar.from = mid;
    }
    last.set(bar.lane, bar);
  }
  return bars;
}
