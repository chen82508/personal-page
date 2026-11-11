# CLAUDE.md

這個 repo 是 Kaito（陳凱樺）的個人網站：單頁、靜態、多語言，用 Angular 22 + PrimeNG 22 + Tailwind CSS 4 建置，部署在 GitHub Pages（<https://chen82508.github.io/personal-page/>）。repo 是**公開的**。

給人看的說明（安裝、指令、部署）在 [README.md](README.md)；這份文件說明 Claude 在這個 repo 工作時需要知道的架構、慣例與限制。

## 常用指令

```bash
npm ci                # 安裝（Node.js 24）
npm start             # 開發伺服器 http://localhost:4200/（英文版 /en/）
npm run lint          # ESLint（angular-eslint）
npm run format        # Prettier 格式化；檢查用 format:check
npm run typecheck     # tsc，涵蓋 app 與 spec
npm run test:ci       # Vitest 跑一次；npm test 為 watch 模式
npm run build         # 正式版 build → dist/kaito-angular/browser
```

在 Claude Code 裡預覽，請用 `.claude/launch.json` 的 `dev` 設定啟動伺服器。

## 架構

- **單一頁面、單一元件**：`src/app/app.ts` + `app.html` 就是整個頁面（Hero → About → Highlights → Experience → Projects → Tech Stack → Contact → footer）。沒有使用 router；語言切換是一般的連結，會重新載入頁面。
- **內容與版型分離**：所有文案都在 `src/app/i18n/<lang>.ts`，型別是 `types.ts` 的 `SiteContent`；`app.html` 只透過 `c.*` 讀取。`CONTACTS`（Email、GitHub、LinkedIn）各語言共用。
- **語言判斷**：`detectLang` 取網址在 base href 之後的路徑，`en/` 開頭就是英文，其餘是中文（基準語言 `zh`）。結果透過 `SITE_LANG` injection token 提供；測試裡可以直接 provide 指定語言。`App` 會依語言設定 `<html lang>`、`document.title` 與 meta description。
- **頁內錨點**：`index.html` 有 `<base href>`，所以 `href="#id"` 會回到根路徑（中文版）。頁內錨點一律寫成 `c.homePath + '#id'`。
- **UI 元件**（`src/app/ui/`）：`app-eyebrow`（區塊小標）、`app-highlight-card`（包住 `p-card`）、`app-project-card`（作品集卡片，同樣包住 `p-card`）、`app-demo-button`（「觀看操作示範」按鈕＋`p-dialog`，作品集與 Highlights 共用；Dialog 以 `@defer` 延後載入）、`app-status-tag`（包住 `p-tag`，狀態有 `active` / `done` / `explore`）。
- **示範動畫**：動態 WebP 放在 `public/projects/`，只在對話框開啟時才載入。以 2 倍像素密度截圖、輸出 1600 px 寬，Retina 螢幕上才不會模糊；不用 GIF，因為同樣寬度的 GIF 要 14 MB 以上，且只有 256 色。
  - 作品集的兩個公部門網站：網站改版或要重錄時，用 `scripts/record-project-demos.py`（Python Playwright＋Pillow，以本機 Chrome 執行）。
  - 預測市場資料平台（Highlights 02）：平台已下線，畫面由 `pmi-platform` repo 的 `scripts/screenshots/capture.mjs` 對 GitHub Pages 上的展示版擷取（GIF 分頁設 `deviceScaleFactor: 2`），再用錄製腳本的 `encode` 轉成 WebP。
- **作品集與經歷互相連結**：`Project.job` 對應經歷的 `JobKey`；卡片上的公司名稱連到 `#job-<key>`，經歷下方的「相關作品」連到 `#project-<key>`。目標在「更早的經歷」裡時，`App` 會在 `hashchange` 時先展開再捲動。
- **捲動淡入**：帶有 `.reveal` class 的元素進入視窗時，`App` 用 IntersectionObserver 加上 `in-view`；使用者偏好減少動畫時直接全部顯示。延遲用 `delay-100` / `delay-200`。

## 樣式與主題

- **固定深色、單一主題**：不跟隨系統的淺色／深色設定（PrimeNG `darkModeSelector: 'none'`、`:root { color-scheme: dark }`）。
- **設計 token** 定義在 `src/styles.css` 的 `@theme`：`ink` / `ink-alt`（背景）、`surface`、`line`、`accent` / `accent-soft` / `accent-dim`（淡橘）、`cream`（標題）、`warm-grey`（內文）、`faint`（註解）；字體 `font-sans`（中文優先）、`font-serif`、`font-mono`。**只使用這些 token**，不要寫死新的顏色。
- **PrimeNG 主題**在 `src/app/theme/kaito-preset.ts`，以 Aura 為基底，色票與 `@theme` 一一對應（註解標了對應的 token）。改其中一邊的顏色時，另一邊也要跟著改。
- **CSS layer 順序**：`theme, base, primeng, components, utilities`。PrimeNG 的樣式放在 `primeng` layer，排在 Tailwind utilities 之前，所以元件可以直接用 utility class 覆寫。
- **版面慣例**：
  - 區塊背景交錯使用 `bg-ink` 與 `bg-ink-alt border-y border-line-soft`。
  - 內容寬度：文字類 `max-w-[760px]`，卡片格線 `max-w-[1040px]`；左右 `px-6`。
  - 手機版用 `max-sm:` 調整。
- **維持現有設計**：除非使用者明確要求，不要調整版面、配色、字體或元件樣式。新區塊沿用現有元件與 section 版型；不要用 emoji 當裝飾。

## 多國語言

- 目前有 `zh`（基準語言）與 `en`；日文 `ja` 等使用者建立日文履歷後再加入。
- **改到任何頁面文字、條目或連結前，先讀 `.claude/skills/i18n-sync/SKILL.md`**。重點是：
  - 每次改動都要同時改所有語言。
  - 新欄位加進 `SiteContent`，不要設成可選欄位。
  - `app.html` 不能寫死任何語言的文字。
- `src/app/i18n/content.spec.ts` 會自動檢查各語言的條目數量、順序、連結與狀態，以及有沒有空字串。數字與翻譯是否一致要人工確認。

## 程式碼慣例

- **元件**：standalone components，輸入用 signal 的 `input()` / `input.required()`，相依用 `inject()`。小元件用 inline template（見 `src/app/ui/`）。
- **元件前綴**：`app`（元件為 kebab-case element，指令為 camelCase attribute），由 ESLint 檢查。
- **型別**：資料結構用 `interface`（ESLint 規則）；TypeScript `strict` 與 Angular `strictTemplates` 都已開啟。
- **格式**：Prettier（`printWidth: 100`、單引號；HTML 用 angular parser）。`docs/`、`.claude/`、`README.md`、`CLAUDE.md` 不經過 Prettier，保留手寫的換行。
- **註解**：以繁體中文為主，說明「為什麼」而不是「做什麼」。
- **測試**：Vitest + jsdom（`*.spec.ts`）。
  - `src/app/app.spec.ts` 測整頁的渲染。
  - `src/app/i18n/content.spec.ts` 測語言一致性。
  - 計算元素數量時，選擇器要限定在區塊內（例如 `#highlights p-card`），不要計算整頁。

## 內容規則與隱私

- **手機號碼不放上網站**，聯絡方式只有 Email、GitHub、LinkedIn。
- **`docs/reference/`（履歷 PDF 等私人資料）已加入 `.gitignore`，永遠不要 commit。**
- **第三方客戶名稱**（例如台達電、中油、政府機關、銀行、LINE Pay）在使用者確認可以公開之前，所有語言都以匿名描述呈現。自己任職過的公司與 ASML 可以寫出。
- **文案只能根據履歷**，不增減事實或數字。履歷中有疑問的數據，先列進 `docs/TODO.md` 請使用者確認，不要放上網站。
- **文案語氣**：
  - 共通：第一人稱、具體、以數字佐證。
  - 中文：台灣用語、全形標點、中英文之間留半形空格。
  - 英文：短句、主動語態、以動詞開頭描述成果、美式拼字。

## docs/TODO.md

內容補充的待辦清單，依 High / Medium / Low 排序。

- 完成任何項目時，**直接把它標成 done**（`- [x]` 加上 **（done）**），並同步更新第 2 節的表格與第 3 節的執行順序。
- 需要使用者提供資料或做決定的新事項，加進對應的優先順序裡。

## 驗證

- **CI 檢查**：每次改動後都要通過 `lint`、`format:check`、`typecheck`、`test:ci`、`build`。這 5 項就是 `.github/workflows/ci.yml` 的 status check，任何一項失敗，`CI passed` 就不會通過。
- **瀏覽器檢查**：會影響畫面的改動，還要在瀏覽器確認：
  - 每個語言的頁面（`/`、`/en/`）
  - 桌面與手機寬度（375px），而且沒有水平捲動
- **截圖前的處理**：頁面有捲動淡入，`html` 也開了 smooth scroll。截圖前先替所有 `.reveal` 加上 `in-view`，捲動時用 `behavior: 'instant'`，否則畫面會停在淡入或捲動途中。

## CI、部署與 Git

- **CI**（`.github/workflows/ci.yml`）：
  - 觸發時機：每個 PR 與每次 push 到 `main`。
  - 必要檢查：lint、format、typecheck、test、build，彙整成 `CI passed`。branch protection 只需要要求這一項。
  - 另有 `Dependency audit`，僅供參考，不影響 `CI passed`。
- **部署**（`.github/workflows/deploy-pages.yml`）：push 到 `main` 就會部署。
  - 部署前會先跑單元測試。
  - build 時以 repo 子路徑作為 `--base-href`。
  - 會把 `index.html` 複製成 `404.html`（SPA fallback），並為每個非基準語言複製成 `<lang>/index.html`。**新增語言時，這裡也要加一行。**
- **PrimeUI license key** 寫在 `src/app/app.config.ts`（Community License）。
- **Git**：
  - 不直接 commit 到 `main`。工作在分支上進行（內容相關用 `content/*`），再以 PR 合併。
  - Commit message 用英文，第一行簡述做了什麼。
  - 推送到 GitHub 可能會被 Claude Code 的權限檢查擋下；被擋時請使用者自己推送，不要繞過。
