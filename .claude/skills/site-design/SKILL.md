---
name: site-design
description: 個人網站的版面與元件設計原則：卡片（p-card）的對齊與動作列位置、區塊背景交錯、對話框、示範圖片與動畫的規格，以及畫面驗證方式。只要新增或調整區塊、卡片、按鈕、對話框、圖片／動畫，或改動 app.html 與 src/app/ui/ 的版型，都要先讀這份 skill。
---

# site-design：版面與元件的設計原則

這份 skill 收錄使用者確認過的設計原則，以及背後的原因。
CLAUDE.md 的「樣式與主題」說明 token 與主題設定；這裡說明**元件怎麼排、怎麼對齊、怎麼驗證**。
新增的原則請寫進對應的章節，並附上「為什麼」。

## 1. 卡片（p-card）

### 1.1 同一組卡片的動作列，位置必須一致

同一個格線裡的卡片，按鈕與連結（例如「看完整過程」「觀看操作示範」）**一律貼齊卡片底部，而且固定在同一側**。
不能因為某張卡片內容較短、或少了某個選填欄位，按鈕就跑到不同的高度或另一側。

做法（`app-story-card`、`app-project-card` 都是這樣寫）：

```html
<p-card
  class="h-full … *:grow [&_.p-card-content]:flex [&_.p-card-content]:grow [&_.p-card-content]:flex-col"
>
  <div class="flex grow flex-col">
    …卡片內容…
    <div class="mt-auto flex flex-wrap items-end gap-x-5 gap-y-4 pt-6">
      @if (選填內容) { … }
      <button class="ml-auto …">…</button>
    </div>
  </div>
</p-card>
```

- **`*:grow` 與 `[&_.p-card-content]:…`**：PrimeNG 的 `.p-card-body` 與 `.p-card-content` 預設不會撐滿卡片高度。同一列裡內容較短的卡片，按鈕列會比其他卡片高（實測：解題故事差 4 px、作品集差 22 px）。讓兩層都 grow，按鈕列的 `mt-auto` 才會貼齊卡片底部。
- **按鈕用 `ml-auto` 固定在右側，不要靠 `justify-between`**：`justify-between` 在只有一個子元素時會把它推到左邊。解題故事的卡片有的有代表數字、有的沒有，原本就因此一張在右、一張在左。
- **間距用 `pt-6` 而不是 `mt-6`**：`mt-auto` 已經佔用了上方的 margin。
- 主要動作是靠左的一組（例如作品集的「觀看操作示範＋前往網站」）時，整組靠左即可，但同樣要貼齊底部。

### 1.2 選填內容不能推動其他元素

卡片的選填欄位（`metric: … | null`、`figure: … | null` 等）不存在時，其他元素的位置要和有值時相同。
新增選填欄位時，先想清楚「沒有這個欄位的卡片長什麼樣子」，再決定版型。

### 1.3 外觀沿用既有卡片

新的卡片元件沿用 `app-highlight-card` 的外框、內距與 hover 樣式字串（邊框、`backdrop-blur`、hover 位移與陰影），不要另外設計一套。

## 2. 區塊（section）

- **背景交錯**：區塊依序交錯使用 `bg-ink`（不加 class）與 `border-y border-line-soft bg-ink-alt`。
  - 新增、刪除或移動區塊後，**從變動處往下重新交錯**，不要只改新區塊。
  - 區塊內的面板背景要與區塊相反（例如技術棧的說明面板：區塊是 `bg-ink` 時面板用 `bg-ink-alt`）。
  - 目前順序：Hero → About（ink-alt）→ Highlights（ink）→ Experience（ink-alt）→ Approach（ink）→ Projects（ink-alt）→ Tech Stack（ink）→ Contact（ink-alt）。
- **區塊開頭**：置中的 `app-eyebrow`（英文小標，所有語言共用）＋ `h2` ＋ 選用的 intro，外層 `reveal mx-auto mb-14 max-w-[560px] text-center`。
- **寬度**：文字類 `max-w-[760px]`，卡片格線 `max-w-[1040px]`，左右 `px-6`。
- **區塊內再分組**（例如解題故事的 Solution workflow／Domain know-how）：組標題用 `font-mono text-accent-soft`，旁邊放一句說明，組與組之間 `mt-16`。

## 3. 摘要與完整內容：卡片＋對話框

- 卡片只放摘要與代表數字；完整內容放進 `p-dialog`，讓有興趣的人主動點開，不把區塊拉得很長。
- 對話框一律包在 `@defer (when open())` 裡：Dialog 的程式碼是獨立的 lazy chunk，不增加首頁 bundle。
- `appendTo="body"`：卡片有 transform（淡入、hover 位移），對話框留在卡片內時，fixed 定位會被限制在卡片範圍。
- 其餘設定沿用 `app-demo-button`：`modal`、`dismissableMask`、不可拖曳與縮放、`maskStyleClass="bg-ink/80 backdrop-blur-[2px]"`、`closeAriaLabel` 從 i18n 取得、`[breakpoints]` 讓手機上寬度為 `94vw`。
- 對話框內的圖片與動畫用 `@if (open())` 包住：沒開過就不下載，關掉再開會從頭播放。
- 開啟按鈕加 `aria-haspopup="dialog"`；測試以這個屬性找按鈕。

## 4. 圖片與動畫

- **解析度以實際顯示寬度的 2 倍為準**（Retina 螢幕）：
  - 對話框整寬的示範動畫顯示約 828 px → 輸出 1600 px 寬。
  - 對話框內並排兩張圖時，每張顯示約 327 px → 輸出 640 px 寬。
  - 截圖時用 `device_scale_factor=2`，不要先縮小再放大。
- **動畫用動態 WebP，不用 GIF**：同樣寬度的 GIF 要 14 MB 以上，而且只有 256 色；動態 WebP 約 1–2 MB、全彩，同樣用 `<img>` 自動循環播放。
- `<img>` 一律帶 `width`／`height`（原始尺寸），避免載入時版面跳動；替代文字放在 i18n。
- **圖片只放主體**：說明、圖例、色階對照等文字放在圖下方的 HTML（可翻譯、可讀），不要畫進圖片。
- **示意圖不用客戶的真實資料**：例如 ASML 的缺陷影像，以程式產生的模擬影像呈現，並在圖說註明「示意圖，並非實際資料」。repo 是公開的。
- 檔案放在 `public/projects/`（作品集示範）或 `public/stories/`（解題故事）。

## 5. 頁內連結

- 錨點一律寫成 `c.homePath + '#id'`（`index.html` 有 `<base href>`，直接寫 `#id` 會回到中文版）。
- 有對應關係的內容**雙向連結**：作品集 ↔ 經歷（`#project-<key>` / `#job-<key>`）、解題故事 ↔ 經歷（`#story-<key>` / `#job-<key>`）。
- 目標可能收在「更早的經歷」裡時，不用另外處理：`App` 會在 `hashchange` 時先展開再捲動。
- 行內連結清單的前綴與分隔符號（「相關作品：」「、」）放在 `<span>` 裡，避免範本換行在分隔符號前後多出空白。

## 6. 顏色與裝飾

- 只用 `src/styles.css` `@theme` 的 token，不寫死新的顏色；改 PrimeNG 元件顏色時，同步改 `kaito-preset.ts`。圖片內容（例如 jet 色階）是資料，不受此限。
- 不用 emoji 當裝飾；圖示用 inline SVG，加 `aria-hidden="true"`。
- 除非使用者要求，不改既有區塊的版面、配色與字體。

## 7. 驗證

除了 CLAUDE.md 的 5 項 CI 檢查，畫面改動還要：

1. 在 `/` 與 `/en/`、桌面與 375 px 寬度下確認，`document.documentElement.scrollWidth` 等於視窗寬度（沒有水平捲動）。
2. 截圖前先替所有 `.reveal` 加上 `in-view`、把 `scroll-behavior` 設為 `auto`，捲動用 `behavior: 'instant'`；截圖若還在淡入，等一下再截一次。
3. **對齊用數字確認，不要只看截圖**。例如檢查同一組卡片的按鈕位置：

   ```js
   [...document.querySelectorAll('#stories app-story-card')].map((c) => {
     const card = c.querySelector('p-card').getBoundingClientRect();
     const b = c.querySelector('button').getBoundingClientRect();
     return `right ${Math.round(card.right - b.right)} / bottom ${Math.round(card.bottom - b.bottom)}`;
   });
   ```

   同一組卡片的數值必須完全相同，桌面與 375 px 都要測。
4. 有對話框的改動：實際點開一次，確認標題、內容與圖片（`naturalWidth`）都正確，並在手機寬度下確認對話框沒有超出畫面。
