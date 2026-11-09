import { Component, DOCUMENT, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { EN } from './i18n/en';
import { CONTACTS, Lang, SITE_LANG, SiteContent } from './i18n/types';
import { ZH } from './i18n/zh';
import { Eyebrow } from './ui/eyebrow';
import { HighlightCard } from './ui/highlight-card';

const CONTENT: Record<Lang, SiteContent> = { zh: ZH, en: EN };

@Component({
  selector: 'app-root',
  imports: [ButtonDirective, Card, Eyebrow, HighlightCard],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly c = CONTENT[inject(SITE_LANG)];
  protected readonly contacts = CONTACTS;

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
