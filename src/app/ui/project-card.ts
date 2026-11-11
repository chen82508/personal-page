import { Component, input, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { Project } from '../i18n/types';

// 外框沿用 app-highlight-card 的 p-card 樣式。
// 示範動畫不直接放在卡片上：按下按鈕才開啟對話框並載入 GIF，
// 讓有興趣的人主動觀看，也省下沒打開時的下載量。
@Component({
  selector: 'app-project-card',
  imports: [ButtonDirective, Card, Dialog],
  host: { class: 'block h-full' },
  template: `
    <p-card
      class="h-full border border-line backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-350 ease-out-expo hover:-translate-y-[5px] hover:border-accent-dim hover:shadow-[0_20px_44px_-24px_rgb(223_160_110/0.35)]"
    >
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
      <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          pButton
          type="button"
          rounded
          outlined
          severity="secondary"
          size="small"
          class="gap-2 text-[.86rem] transition-[border-color,color] duration-250 hover:border-accent-dim hover:text-cream"
          aria-haspopup="dialog"
          (click)="open.set(true)"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" />
          </svg>
          {{ demoLabel() }}
        </button>
        <a
          class="inline-flex items-center gap-1.5 font-mono text-[.8rem] tracking-[.04em] text-accent-soft no-underline transition-colors duration-250 hover:text-cream"
          [href]="project().href"
          target="_blank"
          rel="noopener"
          >{{ visitLabel() }}<span aria-hidden="true">→</span
          ><span class="sr-only">{{ newTabLabel() }}</span></a
        >
      </div>
    </p-card>

    <!-- Dialog 的程式碼延後到第一次開啟時才載入，不增加首頁的 bundle -->
    <!-- appendTo body：卡片有 transform（淡入、hover 位移），留在卡片內時 fixed 定位會被限制在卡片範圍 -->
    @defer (when open()) {
      <p-dialog
        [header]="project().title"
        [(visible)]="open"
        modal
        dismissableMask
        [draggable]="false"
        [resizable]="false"
        maskStyleClass="bg-ink/80 backdrop-blur-[2px]"
        appendTo="body"
        [closeAriaLabel]="closeLabel()"
        [style]="{ width: '880px' }"
        [breakpoints]="{ '960px': '94vw' }"
      >
        <!-- 只在對話框開啟時才放入 img，關閉後移除，下次開啟會從頭播放 -->
        @if (open()) {
          <img
            class="block h-auto w-full rounded-md border border-line-soft"
            [src]="project().media.gif"
            [alt]="project().media.alt"
            width="800"
            height="500"
          />
        }
        <p class="mt-4 text-[.86rem] text-warm-grey">
          <span class="font-mono text-[.76rem] tracking-[.06em] text-faint">{{ tryLabel() }}</span
          >{{ project().tryIt }}
        </p>
      </p-dialog>
    }
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

  protected readonly open = signal(false);
}
