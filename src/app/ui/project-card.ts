import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { Project } from '../i18n/types';
import { DemoButton } from './demo-button';

// 外框沿用 app-highlight-card 的 p-card 樣式；示範動畫由 app-demo-button 開啟
@Component({
  selector: 'app-project-card',
  imports: [Card, DemoButton],
  host: { class: 'block h-full' },
  template: `
    <!-- 動作列貼齊卡片底部：同一列兩張卡片的按鈕才會對齊（見 site-design skill） -->
    <p-card
      class="h-full border border-line backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-350 ease-out-expo *:grow hover:-translate-y-[5px] hover:border-accent-dim hover:shadow-[0_20px_44px_-24px_rgb(223_160_110/0.35)] [&_.p-card-content]:flex [&_.p-card-content]:grow [&_.p-card-content]:flex-col"
    >
      <div class="flex grow flex-col">
        <p class="font-mono text-[.74rem] tracking-[.08em] text-faint">
          {{ project().client }} ·
          <a
            class="text-faint underline decoration-line underline-offset-4 transition-colors duration-250 hover:text-cream hover:decoration-accent-dim"
            [href]="jobHref()"
            >{{ jobLabel() }}</a
          >
        </p>
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
        <div class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
          <app-demo-button
            [label]="demoLabel()"
            [closeLabel]="closeLabel()"
            [header]="project().title"
            [media]="project().media"
            [caption]="{ label: tryLabel(), text: project().tryIt }"
          />
          <a
            class="inline-flex items-center gap-1.5 font-mono text-[.8rem] tracking-[.04em] text-accent-soft no-underline transition-colors duration-250 hover:text-cream"
            [href]="project().href"
            target="_blank"
            rel="noopener"
            >{{ visitLabel() }}<span aria-hidden="true">→</span
            ><span class="sr-only">{{ newTabLabel() }}</span></a
          >
        </div>
      </div>
    </p-card>
  `,
})
export class ProjectCard {
  readonly project = input.required<Project>();
  /** 對應經歷的公司名稱與錨點 */
  readonly jobLabel = input.required<string>();
  readonly jobHref = input.required<string>();
  readonly tryLabel = input.required<string>();
  readonly demoLabel = input.required<string>();
  readonly closeLabel = input.required<string>();
  readonly visitLabel = input.required<string>();
  readonly stackLabel = input.required<string>();
  readonly newTabLabel = input.required<string>();
}
