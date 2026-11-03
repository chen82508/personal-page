import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Eyebrow } from './ui/eyebrow';
import { HighlightCard, HighlightIcon } from './ui/highlight-card';
import { Status } from './ui/status-tag';

type Highlight = {
  index: string;
  status: Status;
  label: string;
  icon: HighlightIcon;
  title: string;
  body: string;
  delay: string;
  href?: string;
};

@Component({
  selector: 'app-root',
  imports: [ButtonDirective, Eyebrow, HighlightCard],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly highlights: Highlight[] = [
    {
      index: '01',
      status: 'active',
      label: 'OPEN TO WORK',
      icon: 'code',
      title: 'FDE × 自主接案',
      body: '開放 Forward Deployed Engineer（FDE）職缺與接案合作：從需求訪談、問題釐清，到資料管線、後端服務的實作與上線，都能一路接手。',
      delay: '',
    },
    {
      index: '02',
      status: 'done',
      label: 'SHIPPED',
      icon: 'project',
      title: '預測市場資料平台',
      body: '參與一個彙整多家交易所報價的資料平台，負責資料擷取流程、資料庫容量與備份規劃，以及 API 逾時等效能問題的調查與修正。產品計劃告一段落後，經授權整理為開源的作品快照。',
      delay: 'delay-100',
      href: 'https://github.com/chen82508/pmi-platform',
    },
    {
      index: '03',
      status: 'done',
      label: 'DEPLOYED',
      icon: 'stack',
      title: 'ASML Experience',
      body: '曾受公司外派至 ASML，參與軟體開發與 Software Quality Assurance（SQA），累積企業級環境下的開發、品質驗證與跨團隊協作經驗。',
      delay: 'delay-200',
    },
  ];

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

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
