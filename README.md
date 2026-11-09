# Kaito — Personal Page

Kaito（陳凱樺）的個人網站：資深後端與基礎設施工程師，開放 Forward Deployed Engineer（FDE）職缺與自主接案合作。

- 中文版：<https://chen82508.github.io/personal-page/>
- English：<https://chen82508.github.io/personal-page/en/>

## 技術棧

| 類別 | 使用 |
|---|---|
| 框架 | Angular 22（standalone components、signal inputs） |
| UI | PrimeNG 22，搭配自訂主題 preset（`src/app/theme/kaito-preset.ts`） |
| 樣式 | Tailwind CSS 4；顏色與字體 token 定義在 `src/styles.css` 的 `@theme` |
| 測試 | Vitest（`ng test`） |
| 程式碼品質 | ESLint（angular-eslint）、Prettier、TypeScript strict 模式與 strict templates |
| 部署 | GitHub Actions → GitHub Pages |

## 專案結構

```text
src/
├── index.html              # 預設（中文）的 title 與 meta description
├── styles.css              # 設計 token、全域樣式、捲動淡入
└── app/
    ├── app.html            # 唯一的頁面版型，所有語言共用
    ├── app.ts              # 依網址選擇語言、設定 <html lang>／title／description
    ├── i18n/
    │   ├── types.ts        # SiteContent 結構、聯絡方式、依網址判斷語言
    │   ├── content.ts      # 所有語言的登記處（CONTENT）與基準語言
    │   ├── zh.ts           # 中文文案（基準語言）
    │   ├── en.ts           # 英文文案
    │   └── content.spec.ts # 檢查各語言結構一致
    ├── ui/                 # eyebrow、highlight-card、status-tag 元件
    └── theme/              # PrimeNG 主題 preset
docs/
├── TODO.md                 # 內容補充的待辦清單
└── reference/              # 履歷等私人參考資料（已加入 .gitignore，不會進版控）
.claude/skills/i18n-sync/   # 多國語言同步規則（給 Claude Code 使用）
```

## 修改網站內容

頁面上的文字都在 `src/app/i18n/<語言>.ts`，`app.html` 只負責版型。

- **改文字**：改對應語言檔裡的欄位；**每個語言都要一起改**。
- **新增欄位或條目**：先在 `types.ts` 的 `SiteContent` 加上欄位。所有語言檔都要補上，才能通過編譯。
- **新增語言**（例如日文）：依照 [`.claude/skills/i18n-sync/SKILL.md`](.claude/skills/i18n-sync/SKILL.md) 的步驟進行。

各語言的條目數量、連結與順序由 `content.spec.ts` 自動檢查；數字與翻譯是否一致，要靠人工確認。

## 開發

需要 Node.js 24。

```bash
npm ci
```

```bash
npm start
```

開啟 <http://localhost:4200/>（中文）或 <http://localhost:4200/en/>（英文）。

| 指令 | 用途 |
|---|---|
| `npm start` | 啟動開發伺服器 |
| `npm run build` | 正式版 build，輸出到 `dist/kaito-angular/browser` |
| `npm test` | 以 watch 模式跑單元測試 |
| `npm run test:ci` | 跑一次單元測試（CI 用） |
| `npm run lint` | ESLint |
| `npm run format` | 以 Prettier 格式化 |
| `npm run format:check` | 檢查格式（CI 用） |
| `npm run typecheck` | TypeScript 型別檢查（app 與測試） |

## CI 與 status checks

`.github/workflows/ci.yml` 會在每個 pull request 與每次 push 到 `main` 時執行：

| Check | 內容 |
|---|---|
| Lint (ESLint) | angular-eslint 建議規則，含 TypeScript 與模板的無障礙規則 |
| Format (Prettier) | 格式檢查（`docs/`、`.claude/`、`README.md`、`CLAUDE.md` 除外） |
| Type check | TypeScript strict 模式 |
| Unit tests | Vitest，含各語言版本的一致性測試 |
| Build | 正式版 AOT 編譯，含嚴格的模板型別檢查與 bundle 大小上限 |
| Dependency audit | 正式環境依賴的漏洞檢查（僅供參考，不影響 CI passed） |
| **CI passed** | 前 5 項全部成功才會通過 |

在 branch protection 只需要把 **CI passed** 設為必要檢查。

## 部署

push 到 `main` 時，`.github/workflows/deploy-pages.yml` 會：

1. 執行單元測試
2. 以 repo 子路徑（`/personal-page/`）作為 `--base-href` 進行 build
3. 複製 `index.html` 為 `404.html`（SPA fallback）與 `en/index.html`（讓 `/en/` 直接回應 200）
4. 部署到 GitHub Pages
