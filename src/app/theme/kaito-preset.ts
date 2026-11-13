import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// PrimeNG 主題：以 Aura 為基底，換上與 src/styles.css @theme 相同的暖色色票
// 本站固定深色（:root color-scheme: dark），Aura 的 light-dark() 一律取深色值；
// 這裡直接覆寫成單一值，避免任何系統主題差異
export const KaitoPreset = definePreset(Aura, {
  semantic: {
    primary: {
      ...palette('#dfa06e'), // --color-accent
      color: '#dfa06e',
      contrastColor: '#241a10',
      hoverColor: '#f0c79a', // --color-accent-soft
      activeColor: '#8a6a4b', // --color-accent-dim
    },
    surface: {
      0: '#ffffff',
      50: '#f2e8d8', // --color-cream
      100: '#e2d5c1',
      200: '#cdbea8',
      300: '#b7a892', // --color-warm-grey
      400: '#998a74',
      500: '#7a6c58', // --color-faint
      600: '#5a4c3c',
      700: '#372c21', // --color-line
      800: '#241d16', // --color-surface-solid
      900: '#1c1712', // --color-ink-alt
      950: '#17130f', // --color-ink
    },
    text: {
      color: '{surface.50}',
      hoverColor: '{surface.0}',
      mutedColor: '{surface.300}',
      hoverMutedColor: '{surface.200}',
    },
    content: {
      background: '{surface.800}',
      hoverBackground: '{surface.700}',
      borderColor: '{surface.700}',
    },
    focusRing: {
      width: '2px',
      offset: '3px',
    },
  },
  components: {
    button: {
      root: {
        roundedBorderRadius: '9999px',
        paddingX: '1.875rem',
        paddingY: '0.9375rem',
        label: { fontWeight: '600' },
      },
      outlined: {
        secondary: {
          borderColor: '{surface.700}',
          color: '{surface.300}',
          hoverBackground: 'transparent',
        },
      },
    },
    card: {
      root: {
        background: 'rgb(38 31 24 / 0.6)', // --color-surface
        borderRadius: '1rem',
        shadow: 'none',
      },
      body: { padding: '1.875rem 1.625rem', gap: '0' },
    },
    // 作品集的示範動畫對話框；Aura 預設取淺色 overlay（白底），這裡改成深色
    dialog: {
      root: {
        background: '{surface.800}', // --color-surface-solid
        borderColor: '{surface.700}', // --color-line
        color: '{surface.50}', // --color-cream（標題）
        borderRadius: '1rem',
        shadow: '0 30px 80px -24px rgb(0 0 0 / 0.75)',
      },
      header: { padding: '1.25rem 1.5rem 0.75rem' },
      title: { fontSize: '1.06rem', fontWeight: '600' },
      content: { padding: '0 1.5rem 1.5rem' },
    },
    tag: {
      root: {
        fontSize: '0.68rem',
        fontWeight: '400',
        padding: '0.25rem 0.625rem',
        gap: '0.4375rem',
        roundedBorderRadius: '9999px',
      },
    },
    toast: {
      root: { width: 'auto', borderRadius: '9999px' },
      content: { padding: '0.8125rem 1.375rem' },
      summary: { fontWeight: '400', fontSize: '0.88rem' },
      secondary: {
        background: '{surface.800}',
        borderColor: '{surface.700}',
        color: '{surface.50}',
        shadow: '0 18px 40px -16px rgb(0 0 0 / 0.6)',
      },
    },
  },
});
