import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { KaitoPreset } from './theme/kaito-preset';

// PrimeUI License key（Community License 免費，至 https://primeui.dev/licenses/community 申請）
// 未設定時 PrimeNG 仍可運作，但右下角會顯示「Invalid PrimeUI License」提示
const PRIMEUI_LICENSE = '';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({
      license: PRIMEUI_LICENSE || undefined,
      theme: {
        preset: KaitoPreset,
        options: {
          // 本站固定深色，不跟隨系統主題切換
          darkModeSelector: 'none',
          // 放進 primeng layer，排序在 Tailwind utilities 之前，讓 utility class 能覆寫元件樣式
          cssLayer: { name: 'primeng', order: 'theme, base, primeng' },
        },
      },
    }),
  ],
};
