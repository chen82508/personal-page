import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { Project } from '../i18n/types';

// 外框沿用 app-highlight-card 的 p-card 樣式，上方換成網站實際操作的示範動畫
@Component({
  selector: 'app-project-card',
  imports: [Card],
  host: { class: 'block h-full' },
  template: `
    <p-card
      class="h-full border border-line backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-350 ease-out-expo hover:-translate-y-[5px] hover:border-accent-dim hover:shadow-[0_20px_44px_-24px_rgb(223_160_110/0.35)]"
    >
      <picture class="mb-6 block overflow-hidden rounded-md border border-line-soft">
        <!-- 偏好減少動畫時改用靜態圖，不自動播放 GIF -->
        <source media="(prefers-reduced-motion: reduce)" [srcset]="project().media.still" />
        <img
          class="block h-auto w-full"
          [src]="project().media.gif"
          [alt]="project().media.alt"
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <p class="font-mono text-[.74rem] tracking-[.08em] text-faint">{{ project().meta }}</p>
      <h3 class="mt-2 mb-2.5 text-[1.06rem]">{{ project().title }}</h3>
      <p class="text-[.93rem] text-warm-grey">{{ project().body }}</p>
      <p class="mt-4 text-[.86rem] text-warm-grey">
        <span class="font-mono text-[.76rem] tracking-[.06em] text-faint">{{ tryLabel() }}</span
        >{{ project().tryIt }}
      </p>
      <ul class="mt-4 flex flex-wrap gap-1.5" [attr.aria-label]="stackLabel()">
        @for (t of project().tech; track t) {
          <li
            class="rounded-full border border-line px-2.5 py-0.5 font-mono text-[.72rem] leading-normal text-warm-grey"
          >
            {{ t }}
          </li>
        }
      </ul>
      <a
        class="mt-5 inline-flex items-center gap-1.5 font-mono text-[.8rem] tracking-[.04em] text-accent-soft no-underline transition-colors duration-250 hover:text-cream"
        [href]="project().href"
        target="_blank"
        rel="noopener"
        >{{ visitLabel() }}<span aria-hidden="true">→</span
        ><span class="sr-only">{{ newTabLabel() }}</span></a
      >
    </p-card>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly tryLabel = input.required<string>();
  readonly visitLabel = input.required<string>();
  readonly stackLabel = input.required<string>();
  readonly newTabLabel = input.required<string>();
}
