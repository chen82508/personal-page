import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Eyebrow } from './ui/eyebrow';
import { HighlightCard, HighlightIcon, HighlightLink } from './ui/highlight-card';
import { Status } from './ui/status-tag';

type Highlight = {
  index: string;
  status: Status;
  label: string;
  icon: HighlightIcon;
  title: string;
  body: string;
  delay: string;
  links?: HighlightLink[];
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
      body: '為彙整 9 家預測市場交易所的資料平台建置擷取管線，每日處理 1,270 萬至 1,790 萬筆價格快照，資料完整性提升 23%，並補齊 450 萬筆資料缺口。我主導了封存管線的效能調查，提出的方案預估可將上傳時間從 3～4 天縮短到 2 小時以內。產品下線時，我封存了 213 GB 資料、除役 16 項服務，零資料遺失；之後經授權整理為開源的作品快照。',
      delay: 'delay-100',
      links: [
        { label: '線上展示', href: 'https://chen82508.github.io/pmi-platform/' },
        { label: '查看原始碼', href: 'https://github.com/chen82508/pmi-platform' },
      ],
    },
    {
      index: '03',
      status: 'done',
      label: 'DEPLOYED',
      icon: 'stack',
      title: 'ASML Experience',
      body: '受公司派駐 ASML，負責 e-Beam 檢測系統的模組化 .NET 架構，並主導核心模組從 .NET Framework 遷移到 .NET Core。我以 Python 與 TestComplete 建立自動化測試框架，將各機台組態的測試涵蓋率從 11% 提升到 32%；也撰寫 UML 設計文件，讓 PM、FAE 與 QA 對需求達成共識。',
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
