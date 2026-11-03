import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { Status, StatusTag } from './status-tag';

export type HighlightIcon = 'project' | 'stack' | 'code';

@Component({
  selector: 'app-highlight-card',
  imports: [Card, StatusTag],
  host: { class: 'block h-full' },
  template: `
    <p-card
      class="h-full border border-line backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-350 ease-out-expo hover:-translate-y-[5px] hover:border-accent-dim hover:shadow-[0_20px_44px_-24px_rgb(223_160_110/0.35)]"
    >
      <div class="mb-[22px] flex items-center justify-between">
        <span class="font-mono text-[.74rem] tracking-[.08em] text-faint">{{ index() }}</span>
        <app-status-tag [status]="status()" [label]="label()" />
      </div>
      <div class="mb-5 flex size-11 items-center justify-center text-accent-soft" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          @switch (icon()) {
            @case ('project') {
              <svg:rect x="6" y="6" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.8" />
              <svg:rect x="14" y="14" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 4" />
            }
            @case ('stack') {
              <svg:rect x="7" y="10" width="26" height="6" rx="3" stroke="currentColor" stroke-width="1.8" />
              <svg:rect x="10" y="19" width="20" height="6" rx="3" stroke="currentColor" stroke-width="1.8" />
              <svg:rect x="13" y="28" width="14" height="6" rx="3" stroke="currentColor" stroke-width="1.8" />
            }
            @case ('code') {
              <svg:path d="M13 13 L7 20 L13 27" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              <svg:path d="M19 13 L25 27" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <svg:path d="M27 20 L31 20" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 3" />
              <svg:circle cx="34" cy="20" r="3" stroke="currentColor" stroke-width="1.8" />
            }
          }
        </svg>
      </div>
      <h3 class="mb-2.5 text-[1.06rem]">{{ title() }}</h3>
      <p class="text-[.93rem] text-warm-grey">{{ body() }}</p>
      @if (href(); as url) {
        <a
          class="mt-5 inline-flex items-center gap-1.5 font-mono text-[.8rem] tracking-[.04em] text-accent-soft no-underline transition-colors duration-250 hover:text-cream"
          [href]="url"
          target="_blank"
          rel="noopener"
        >{{ linkLabel() }}<span aria-hidden="true">→</span><span class="sr-only">（另開新分頁）</span></a>
      }
    </p-card>
  `,
})
export class HighlightCard {
  readonly index = input.required<string>();
  readonly status = input.required<Status>();
  readonly label = input.required<string>();
  readonly icon = input.required<HighlightIcon>();
  readonly title = input.required<string>();
  readonly body = input.required<string>();
  readonly href = input<string>();
  readonly linkLabel = input('查看原始碼');
}
