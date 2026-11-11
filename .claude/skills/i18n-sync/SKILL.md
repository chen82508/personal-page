---
name: i18n-sync
description: 讓個人網站的每個語言版本（目前為中文 zh、英文 en，預計加入日文 ja）在每次改動時都同步更新。只要改到頁面上看得到的文字、新增或刪除區塊／條目／連結、修改 src/app/i18n/ 底下任何檔案、調整 app.html 的文案，或是新增一個語言，都要先讀這份 skill。
---

# i18n-sync：多國語言版本同步

這個網站的每個語言版本共用同一份版型（`src/app/app.html`），只有文案不同。
**任何一次改動，都必須在所有語言版本裡同時完成**，不能只改其中一個語言，然後留到「之後再補」。

## 檔案在哪裡

| 檔案 | 用途 |
|---|---|
| `src/app/i18n/types.ts` | `Lang` 型別、`SiteContent` 結構、共用的 `CONTACTS`、依網址判斷語言的 `detectLang` |
| `src/app/i18n/content.ts` | `CONTENT`：所有語言的唯一登記處；`BASE_LANG`：基準語言（zh） |
| `src/app/i18n/<lang>.ts` | 各語言的文案（`zh.ts`、`en.ts`，之後的 `ja.ts`） |
| `src/app/i18n/content.spec.ts` | 語言版本一致性測試（見下方「自動檢查」） |
| `src/app/app.html` | 共用版型：只能引用 `c.*`，不能寫死任何語言的文案 |
| `.github/workflows/deploy-pages.yml` | 部署時為每個非基準語言產生 `<lang>/index.html` |

## 每次改動的流程

1. **先列出這次要動的語言**：預設就是 `CONTENT` 裡的全部語言。用 `Object.keys(CONTENT)` 或直接看 `content.ts` 確認，不要憑記憶。
2. **從基準語言（zh）開始改**，再依序改其他語言。每個語言都要改到「同一個位置、同一個條目」。
3. **新增欄位時**：先在 `SiteContent`（`types.ts`）加上欄位，TypeScript 會讓所有還沒補上的語言檔編譯失敗；把每個語言都補齊，直到 build 通過。不要把欄位設成可選（`?`）來繞過這個檢查。
4. **新增或刪除條目時**（經歷、技術、Highlights、語言能力等）：所有語言都要在同一個位置增刪，順序保持一致。
5. **事實與數字要一致**：同一個成果在各語言裡的數字、期間、公司、技術名稱必須相同，只有寫法可以不同（例如 `1,270 萬` 對應 `12.7M`）。改了任何數字，就要在每個語言裡找出對應的句子一起改。
6. **匿名化要一致**：還沒確認可公開的客戶名稱（見 `docs/TODO.md` 的「揭露範圍確認」），在每個語言裡都以同樣的方式匿名。一個語言公開，其他語言就跟著公開。
7. **版型（`app.html`）不能出現語言專屬的文字**。需要新文案時，加到 `SiteContent`，再從 `c.*` 讀取。
8. 完成後跑「驗證」一節的所有步驟。

### 刻意共用、不需翻譯的文字

以下文字所有語言都相同，不必放進語言檔：

- 區塊上方的英文小標（`About`、`Highlights`、`Experience`、`Tech Stack`、`Projects`、`Work With Me`、`Education`、`Languages`）
- 頁尾 `© 2026 Kaito. Open to what's next.`
- Highlights 卡片的狀態標籤（`OPEN TO WORK`、`SHIPPED`、`DEPLOYED`）
- `CONTACTS` 的標籤與網址

如果要讓上述任何一項開始依語言變化，就把它搬進 `SiteContent`，並為所有語言補上翻譯。

## 各語言的用詞與語氣

- **共通**：第一人稱、具體、有數字佐證；避免空泛的形容詞。技術名詞保留原文（NestJS、PostgreSQL、SKILL.md）。
- **zh（繁體中文，台灣用語）**：全形標點（，。：「」（）／）；中文與英數之間保留半形空格；用「資料」「程式碼」「伺服器」等台灣用語。
- **en**：句子短、主動語態、以動詞開頭描述成果（Built / Led / Cut）；數字用 `12.7M`、`~2 weeks`；一律使用美式拼字（centralized、optimize）。
- **ja（預計）**：です／ます調；全形標點（、。「」）；職稱與技術名詞可保留英文；數字用 `1,270 万` 或 `12.7M` 擇一並全站一致。

翻譯不是逐字對照：可以調整句型讓該語言讀起來自然，但不能增減事實或數字。

## 新增一個語言（以日文 ja 為例）

1. `types.ts`：把 `Lang` 改成 `'zh' | 'en' | 'ja'`，並更新 `detectLang` 的路徑判斷（目前只辨識 `en`，要改成辨識所有非基準語言的路徑前綴）。
2. 新增 `src/app/i18n/ja.ts`，以 `zh.ts` 為底完整翻譯；`htmlLang: 'ja'`、`homePath: 'ja/'`。
3. `content.ts`：在 `CONTENT` 登記 `ja`。登記後一致性測試就會自動檢查它。
4. **語言切換器**：目前的 `switcher` 只支援「目前語言／另一個語言」兩個選項。有三個以上語言時，要把它改成列出所有語言（例如 `中文 / EN / 日本語`），並同步調整每個語言檔與 `app.html` 的切換器，以及 `app.spec.ts` 裡的相關測試。
5. `deploy-pages.yml`：仿照 `en` 那一行，加上產生 `ja/index.html` 的步驟。
6. `app.spec.ts`：加一個以 `SITE_LANG = 'ja'` 渲染的測試，`detectLang` 的測試也補上 `/ja/` 路徑。
7. 用 `--base-href` 模擬部署路徑，確認 `/ja/` 的頁內錨點不會跳回基準語言。

## 自動檢查

`src/app/i18n/content.spec.ts` 會對 `CONTENT` 裡的每個語言檢查：

- 沒有留空的文案（`homePath`、`delay` 除外）
- Highlights、經歷（每段的條目數）、技術棧（每組的技術數量）、語言能力的數量與基準語言相同
- Highlights 的編號、狀態、圖示與連結網址相同
- 經歷的順序相同（以期間裡的西元年份比對）
- 每個語言的 `htmlLang`、`homePath`、切換器網址都不重複

它**無法**檢查：數字是否一致、翻譯是否正確、語氣是否自然。這些要靠下方的人工檢查。

## 驗證

每次改動後都要做：

```bash
npm run lint
```

```bash
npm run format:check
```

```bash
npm run typecheck
```

```bash
npm run test:ci
```

```bash
npm run build
```

這些也是 GitHub 上 `CI` workflow 的 status check（`.github/workflows/ci.yml`），任何一項失敗，PR 的「CI passed」就不會通過。

然後在瀏覽器逐一打開每個語言的頁面（`/`、`/en/`，之後加上 `/ja/`），確認：

- 改動的位置在每個語言都看得到
- 桌面與手機寬度（375px）都沒有水平捲動，長句子沒有撐破版面
- `<html lang>`、`document.title` 與 meta description 是該語言的版本
- 「查看作品」的錨點會停留在同一個語言的頁面

最後在回報裡列出「這次改了哪些語言、各改了什麼」。如果某個語言刻意沒改，要說明原因。
