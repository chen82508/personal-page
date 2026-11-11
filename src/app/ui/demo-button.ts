import { Component, input, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

/** 示範動畫：GIF 路徑（相對於 base href）、替代文字與原始尺寸 */
export interface DemoMedia {
  gif: string;
  alt: string;
  width: number;
  height: number;
}

// 「觀看操作示範」按鈕 + 對話框，作品集卡片與 Highlights 卡片共用。
// 示範動畫不直接放在卡片上：按下按鈕才開啟對話框並載入 GIF，
// 讓有興趣的人主動觀看，也省下沒打開時的下載量。
@Component({
  selector: 'app-demo-button',
  imports: [ButtonDirective, Dialog],
  template: `
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
      {{ label() }}
    </button>

    <!-- Dialog 的程式碼延後到第一次開啟時才載入，不增加首頁的 bundle -->
    <!-- appendTo body：卡片有 transform（淡入、hover 位移），留在卡片內時 fixed 定位會被限制在卡片範圍 -->
    @defer (when open()) {
      <p-dialog
        [header]="header()"
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
            [src]="media().gif"
            [alt]="media().alt"
            [width]="media().width"
            [height]="media().height"
          />
        }
        @if (caption(); as cap) {
          <p class="mt-4 text-[.86rem] text-warm-grey">
            <span class="font-mono text-[.76rem] tracking-[.06em] text-faint">{{ cap.label }}</span
            >{{ cap.text }}
          </p>
        }
      </p-dialog>
    }
  `,
})
export class DemoButton {
  readonly label = input.required<string>();
  readonly closeLabel = input.required<string>();
  /** 對話框標題 */
  readonly header = input.required<string>();
  readonly media = input.required<DemoMedia>();
  /** GIF 下方的說明，例如作品集的「試試看：」 */
  readonly caption = input<{ label: string; text: string } | null>(null);

  protected readonly open = signal(false);
}
