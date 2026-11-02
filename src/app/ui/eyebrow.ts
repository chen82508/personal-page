import { Component } from '@angular/core';

@Component({
  selector: 'app-eyebrow',
  host: { class: 'contents' },
  template: `
    <p class="mb-5 inline-flex items-center gap-[9px] font-mono text-[.74rem] tracking-[.12em] text-accent-soft uppercase">
      <span class="size-1.5 flex-none rounded-full bg-accent shadow-[0_0_0_4px_rgb(223_160_110/0.15)]"></span>
      <ng-content />
    </p>
  `,
})
export class Eyebrow {}
