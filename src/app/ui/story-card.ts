import { Component, input, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Dialog } from 'primeng/dialog';
import { Story, StorySteps } from '../i18n/types';

/** 卡片上方連到對應經歷的錨點 */
export interface StoryJobLink {
  label: string;
  href: string;
}

// 外框沿用 app-project-card 的 p-card 樣式。
// 卡片只放摘要與代表數字，完整過程（背景 → 判斷 → 考慮過的做法 → 結果）
// 放進對話框，讓有興趣的人點開再看，不把整個區塊拉得很長。
@Component({
  selector: 'app-story-card',
  imports: [ButtonDirective, Card, Dialog],
  host: { class: 'block h-full' },
  template: `
    <p-card
      class="h-full border border-line backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-350 ease-out-expo hover:-translate-y-[5px] hover:border-accent-dim hover:shadow-[0_20px_44px_-24px_rgb(223_160_110/0.35)]"
    >
      <div class="flex h-full flex-col">
        <!-- 標籤與分隔放在 span 裡，避免範本換行在分隔符號前後多出空白 -->
        <p class="font-mono text-[.74rem] tracking-[.08em] text-faint">
          <span class="sr-only">{{ jobsLabel() }}</span>
          @for (j of jobs(); track j.href; let last = $last) {
            <a
              class="text-faint underline decoration-line underline-offset-4 transition-colors duration-250 hover:text-cream hover:decoration-accent-dim"
              [href]="j.href"
              >{{ j.label }}</a
            >
            @if (!last) {
              <span>{{ separator() }}</span>
            }
          }
        </p>
        <h3 class="mt-2 mb-2.5 text-[1.06rem]">{{ story().title }}</h3>
        <p class="text-[.93rem] text-warm-grey">{{ story().summary }}</p>

        <div class="mt-auto flex flex-wrap items-end justify-between gap-x-5 gap-y-4 pt-6">
          @if (story().metric; as m) {
            <p class="flex flex-col">
              <span class="font-serif text-[1.5rem] leading-tight text-accent">{{ m.value }}</span>
              <span class="text-[.8rem] text-faint">{{ m.label }}</span>
            </p>
          }
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
            {{ readLabel() }}<span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </p-card>

    <!-- Dialog 的程式碼延後到第一次開啟時才載入，不增加首頁的 bundle -->
    <!-- appendTo body：卡片有 transform（淡入、hover 位移），留在卡片內時 fixed 定位會被限制在卡片範圍 -->
    @defer (when open()) {
      <p-dialog
        [header]="story().title"
        [(visible)]="open"
        modal
        dismissableMask
        [draggable]="false"
        [resizable]="false"
        maskStyleClass="bg-ink/80 backdrop-blur-[2px]"
        appendTo="body"
        [closeAriaLabel]="closeLabel()"
        [style]="{ width: '720px' }"
        [breakpoints]="{ '800px': '94vw' }"
      >
        <!-- 前、後對照圖只在對話框開啟時放入，沒開過就不下載 -->
        @if (open() && story().figure; as fig) {
          <figure class="mb-6">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              @for (img of fig.images; track img.src) {
                <div>
                  <img
                    class="block h-auto w-full rounded-md"
                    [src]="img.src"
                    [alt]="img.alt"
                    [width]="fig.width"
                    [height]="fig.height"
                  />
                  <p class="mt-2 font-mono text-[.74rem] tracking-[.06em] text-faint">
                    {{ img.label }}
                  </p>
                </div>
              }
            </div>
            <figcaption class="mt-3 text-[.8rem] text-faint">{{ fig.note }}</figcaption>
          </figure>
        }
        <dl class="space-y-5">
          @for (s of steps; track s) {
            <div>
              <dt class="font-mono text-[.76rem] tracking-[.06em] text-accent-soft">
                {{ stepLabels()[s] }}
              </dt>
              <dd class="mt-1.5 text-[.93rem] leading-relaxed text-warm-grey">
                {{ story().steps[s] }}
              </dd>
            </div>
          }
        </dl>
      </p-dialog>
    }
  `,
})
export class StoryCard {
  readonly story = input.required<Story>();
  readonly jobs = input.required<StoryJobLink[]>();
  readonly jobsLabel = input.required<string>();
  readonly separator = input.required<string>();
  readonly readLabel = input.required<string>();
  readonly closeLabel = input.required<string>();
  readonly stepLabels = input.required<StorySteps>();

  protected readonly steps: (keyof StorySteps)[] = ['context', 'judgment', 'options', 'result'];
  protected readonly open = signal(false);
}
