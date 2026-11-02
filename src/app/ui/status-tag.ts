import { Component, computed, input } from '@angular/core';
import { Tag } from 'primeng/tag';

export type Status = 'active' | 'done' | 'explore';

// 三種狀態視覺語彙：進行中（脈動）／已完成（實心）／探索中（虛線外框）
const STATUS_CLASS: Record<Status, { tag: string; dot: string }> = {
  active: { tag: 'border-accent-dim text-accent-soft', dot: 'bg-accent animate-pill-pulse' },
  done: { tag: 'border-line text-faint', dot: 'bg-warm-grey' },
  explore: { tag: 'border-line text-faint', dot: 'border-[1.5px] border-dashed border-faint' },
};

@Component({
  selector: 'app-status-tag',
  imports: [Tag],
  host: { class: 'contents' },
  template: `
    <p-tag rounded [value]="label()" class="border bg-transparent font-mono tracking-[.08em]" [class]="classes().tag">
      <span class="size-1.5 flex-none rounded-full" [class]="classes().dot" aria-hidden="true"></span>
    </p-tag>
  `,
})
export class StatusTag {
  readonly status = input.required<Status>();
  readonly label = input.required<string>();

  protected readonly classes = computed(() => STATUS_CLASS[this.status()]);
}
