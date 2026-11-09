import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { KaitoPreset } from './theme/kaito-preset';

// PrimeUI License key（Community License 免費，至 https://primeui.dev/licenses/community 申請）
// 未設定時 PrimeNG 仍可運作，但右下角會顯示「Invalid PrimeUI License」提示
const PRIMEUI_LICENSE =
  'eyJpZCI6ImQ5MDY5MDFhLTUzZTgtNDQ5ZS1hNDdiLTlhZGIwZDI3YTVhZSIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTM2MDI4NjIsImV4cCI6MTgyNTEzODg2Mn0.Z3_dGHruLDPM8MJnwfzjVmtpHVPfSBWOpw13d0911CDy20lG-zefpbea_Tq1SEPYjtpxUpCm8WS3ybDL03rhBg';

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
