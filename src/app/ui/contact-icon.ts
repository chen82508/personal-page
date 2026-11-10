import { Component, input } from '@angular/core';

export type ContactIcon = 'mail' | 'github' | 'linkedin';

/** 聯絡方式的小圖示：線條風格與 highlight-card 的圖示一致，顏色跟著 currentColor */
@Component({
  selector: 'app-contact-icon',
  host: { class: 'inline-flex flex-none', 'aria-hidden': 'true' },
  template: `
    @switch (name()) {
      @case ('mail') {
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <svg:rect
            x="3"
            y="5.5"
            width="18"
            height="13"
            rx="2.5"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <svg:path
            d="m4 7.5 8 5.5 8-5.5"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
      @case ('github') {
        <!-- GitHub mark（Primer Octicons, MIT） -->
        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
          <svg:path
            d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
          />
        </svg>
      }
      @case ('linkedin') {
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <svg:rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3.5"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <svg:path
            d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5m0 2.4c0-1.4 1-2.5 2.3-2.5s2.2.9 2.2 2.4V16"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
    }
  `,
})
export class ContactIconView {
  readonly name = input.required<ContactIcon>();
}
