# personal-page 內容補充 TODO

> 建立日期：2026-11-09
> 範圍：只處理**實質內容**（文字、數據、連結、區塊資料），設計風格與 UI 樣式維持不變。
> 來源：`docs/reference/resume.pdf`（2026-11 版）與參考網站 <https://www.tkflyc.com/zh-TW> 的內容比對。
> 新區塊請沿用現有元件（`app-eyebrow`、`app-highlight-card`、`status-tag`）與既有 section 版型，不新增視覺樣式。

---

## 0. 可直接從 resume.pdf 補上的內容（不需要再提供資料）

以下內容履歷已經寫明，可以直接改進網站。執行前只需確認第 1 節「揭露範圍」相關的項目。

- [x] **Hero／About：明確寫出職稱與年資** **（done）**
  - 職稱：資深後端與基礎設施工程師（Senior Backend & Infrastructure Engineer）
  - 年資：9 年以上（2017 至今）；專長：高資料量（Data-intensive）與金融級系統
  - 經手的領域：支付閘道 → 銀行平台 → 半導體檢測軟體（ASML e-Beam）→ 預測市場資料平台
- [x] **About：把「這幾年」改寫成具體經歷** **（done）**
  - 補上 AI 原生開發能力：用 CLAUDE.md／SKILL.md 設計 context 與工作流程，把新資料源整合從約 2 週縮短到 3 天
  - 修正 ASML 的描述：網站與經歷區塊已統一為「受公司派駐 ASML」／「客戶端駐點」
- [x] **Highlights 02「預測市場資料平台」：補上量化數據** **（done）**
  - 9 家交易所（Kalshi, Polymarket, Gemini, Metaculus, Manifold, PredictIt, ForecastEx, Robinhood, IBKR）
  - 每日 1,270 萬至 1,790 萬筆價格快照；資料完整性提升 23%；補齊 450 萬筆資料缺口
  - 16 個擷取 sidecar；CloudWatch 監控與 Slack 告警；213 GB 價格表採用 Partitioning 的建議
  - 封存管線：7.2 至 11 億筆資料的上傳時間從 3～4 天降到 2 小時以內（預估），傳輸量減少 17 倍
  - 產品下線：封存 213 GB、除役 16 項服務，零資料遺失
- [x] **Highlights 03「ASML Experience」：補上具體內容** **（done）**
  - .NET Framework → .NET Core 遷移；模組化架構；硬體整合
  - Python 與 TestComplete 自動化框架，測試涵蓋率從 11% 提升到 32%
  - 3 份 UML 設計文件，讓 PMS、FAES 與 QA 達成共識；驗證報告縮短了 UAT 週期
- [x] **新增「經歷 Experience」區塊（時間軸）**：共 7 段正職加 1 段業外 **（done）**
  - 第三方客戶名稱暫時匿名：台達電子 → 業外接案、中油 → 國營企業、內政部 → 政府共用平台、凱基／臺銀 → 銀行、LINE Pay 省略；確認可公開後再改回（見第 1 節「揭露範圍確認」）
  - 履歷中有疑問的數據已確認並上網：ESG 查詢時間 1.1 秒 → 0.7 秒、一卡通可用性 99.9%
  | 期間 | 公司 | 職稱 | 一句話重點 |
  |---|---|---|---|
  | 2026.03–2026.11 | Micah Group | 資深後端與基礎設施工程師 | 9 家交易所的擷取管線，每日 1,790 萬筆快照 |
  | 2025.12–2026.03 | GoCode Pte Ltd（約聘） | 資深後端開發工程師（Node.js） | NestJS、Redis、Kafka 遊戲平台，效能提升 26% |
  | 2025.07–2025.12 | 台達電子（業外） | 後端開發工程師 | FastAPI、BigQuery ESG 平台 |
  | 2023.05–2025.09 | Zealogics Taiwan | Sr. C# 開發工程師 | ASML e-Beam 檢測系統，測試涵蓋率 11%→32% |
  | 2022.02–2023.04 | PTMB Holding | 資深軟體工程師 | 擔保品計分卡引擎，審查時間減少 50% |
  | 2019.08–2022.01 | 哈瑪星科技 | 軟體工程師 | 花蓮公車追蹤系統，外部 API 呼叫減少 53% |
  | 2018.10–2019.08 | 一卡通 iPASS | 軟體工程師 | 支付 API（含 LINE Pay），交易 ID 改為 GUID |
  | 2017.05–2018.10 | 驊宏資通 | 軟體工程師 | 凱基／臺銀的擔保品與放款系統 |
- [x] **新增「技術棧 Skills」區塊（分類整理）** **（done）**：實作時合併為 6 組（前端併入「框架與 API」，以 AWS EC2／CloudWatch、GCP Cloud SQL 呈現雲端）
  - 語言：Python、C#、TypeScript/Node.js、SQL
  - 後端框架：NestJS、FastAPI、ASP.NET Core、RESTful API、WebSocket
  - 資料：PostgreSQL、MSSQL、Oracle、Redis、Kafka、BigQuery、ETL、Alembic
  - 雲端／基礎設施：AWS（EC2、CloudWatch）、GCP（BigQuery、Cloud SQL）、Docker Compose、Azure DevOps、Git
  - 前端：Angular、Vue.js
  - AI 原生開發：Claude Code、CLAUDE.md、SKILL.md 工作流程
  - 測試與品質：pytest、TestComplete、SQA、UAT 驗證報告
- [x] **新增「學歷與語言」小區塊** **（done）**（放在經歷區塊底部）：國立中興大學應用數學系學士（2011–2016）；中文（母語）、英文（中級）、日文（中級）
- [x] **聯絡方式：補上 GitHub 連結**（github.com/chen82508）；地點：台灣・高雄 **（done）**
- [x] **`index.html` meta description**：加入「資深後端與基礎設施工程師」、「9 年」等關鍵字 **（done）**（英文版另有自己的 title 與 description）
- [x] **⚠️ 不要上網的資訊：手機號碼** **（done）**（網站只放 Email、GitHub、LinkedIn；resume.pdf 已加入 .gitignore） `+886 988-815-690`。這只適合放在履歷上，網站上請只留 Email 與表單類的聯絡方式

- [x] **經歷與「陳凱樺｜履歷主檔」（2026-11-11）對齊** **（done）**
  - 移除主檔列為「已查證不可使用」的說法：.NET Framework → .NET Core 遷移、縮短 UAT 週期、GoCode +26%、驊宏 +13%、BigQuery +17%、資料完整性 +23%、「主導」產品下線與 GUID 遷移
  - 主檔沒有收錄、因此一併拿掉：ESG 儀表板 1.1 秒 → 0.7 秒、一卡通可用性 99.9%（若要保留，請先補進主檔）
  - Zealogics 任職期間改為 2023.05 – 2025.07；語言改為中文、台語（母語）、英文（中級）、日文（基礎）
  - 主檔已寫出的客戶名稱（台達電、中油、內政部、凱基、臺銀、中國信託與特約商店）在網站上仍維持匿名，待第 1 節「揭露範圍確認」

### 履歷本身建議先修正的地方

- [x] 台達電 ESG 的「查詢時間 1.7 秒 → **0.9 毫秒**」：差了約 1,900 倍，請確認是否應為 0.9 秒 **（done）**
  - [x] 台達電 ESG 的查詢時間應為「1.1 秒 → 0.7 秒」：已加進網站業外接案的條目（中英文）；**履歷 PDF 也請改成這個數字**
- [x] Zealogics 職稱「(.Sr) C# 開發工程師」應改為「(Sr.)」
- [x] 一卡通「達成 14% 的可用性提升」：可用性通常以 99.x% 表示，建議改寫成 uptime 從 X% 提升到 Y% **（done）**
  - [x] 一卡通的可用性提升為 `99.9%`：網站寫成「可用性達 99.9%」（中英文）；**履歷 PDF 也請改成這個數字**
- [x] 中興大學英文名應為「National Chung **Hsing** University」

---

## 1. 待補充資料（需要你提供）

### 🔴 High

- [ ] **揭露範圍確認**：網站是公開的，請逐項確認以下客戶名稱可以公開，或需要匿名化（例如改成「某國營能源企業」）
  - [x] ASML（目前網站已公開） **（done）**
  - [x] Micah Group，以及 9 家交易所名稱 **（done）**
  - [ ] 台達電子（業外接案，是否受 NDA 約束）
  - [x] 中油 CPC、凱基銀行、臺灣銀行、LINE Pay **（done）**：你已確認可公開，哈瑪星、驊宏資通的經歷與「支付對帳」故事都改寫出名稱
  - [ ] 中國信託，以及一卡通串接的特約商店（昇恆昌、台灣大車隊、星巴克、全家）：目前仍以「一家銀行與多家特約商店」匿名描述
  - [x] 內政部、花蓮縣政府 **（done）**：你已確認可公開，「專案作品集」與哈瑪星的經歷條目都改寫出名稱
- [x] **LinkedIn 個人頁 URL** **（done）**（linkedin.com/in/kaitochen-15800326ta）（參考網站的聯絡方式為 Email、GitHub、LinkedIn 三項）
- [x] **確認技術與經歷的對照** **（done）**（`src/app/i18n/stack.ts`）：已依你的確認更新網站，C# / .NET 現為 8.4 年 · 5 段經歷
  - [x] 哈瑪星、一卡通、驊宏資通用的程式語言（履歷沒寫；目前 C# / .NET 只算到 PTMB 與 Zealogics，共 3.7 年）
    - [x] 哈瑪星、一卡通、驊宏資通用的程式語言也是 C# / .NET 
  - [x] Micah Group 是否使用 Python（履歷摘要列為核心技術，但 Micah 的條目沒寫到）
    - [x] Micah Group 使用的後端語言確實為 Python
  - [x] Micah Group 的 Redis：履歷寫的是「評估 Redis 暫存方案」，目前未計入
    - [x] Micah Group 的 Redis 已有導入，並配合主機上資料備份作業使用
  - [x] 哈瑪星的 PTX／ArcGIS 整合是否算 RESTful API
    - [x] 是的
  - [x] Git 與 Claude Code 的使用經歷 **（done）**：你已確認 Git 從 iPASS 起用於每段經歷的版控、Claude Code 從 GoCode 起用於正式專案，網站已改列為「實戰經驗」。**履歷本身尚未寫到，請補進對應的經歷條目**
  - [x] 各段經歷的代表數字（經歷區塊的大字）是否是你最想強調的成果
    - [x] 是現階段期代的效果，後續會再蒐集瀏覽者的意見
- [ ] **把網站已確認的內容補回履歷 PDF**（中英文兩份）：網站目前有些內容是你在對話中確認、但履歷還沒寫到的
  - Git（iPASS 起每段）、Claude Code（GoCode 起）、C# / .NET（哈瑪星、一卡通、驊宏資通）、RESTful API（哈瑪星的 PTX／ArcGIS）
  - Micah Group：Python、Redis（配合主機資料備份）
  - 數字：ESG 查詢時間 1.1 秒 → 0.7 秒、一卡通可用性 99.9%
  - GoCode 與 Micah Group 在 2026 年 3 月同時任職
- [ ] **履歷 PDF 是否開放下載**：如果開放，請提供一份**移除手機號碼**的公開版
- [x] **工作型態與地點** **（done）**：高雄／遠端・可出差・接受海外遠端工作（聯絡區塊；英文版為 Kaohsiung, Taiwan / Remote · open to travel and overseas remote work）
  - [x] 可出差、接受海外遠端工作 **（done）**
- [x] **pmi-platform 的「問題 / 方法 / 結果」敘述** **（done）**：已寫成「我怎麼解決問題」區塊的 3 則故事（封存瓶頸、資料品質、SKILL.md 品質關卡）。原本的需求：參考網站每個專案都用一個問句開頭，例如「遷移工具說 PASS，資料就真的對嗎？」。請提供你在這個專案中**最難的一個問題**是什麼，以及當時是怎麼判斷的

### 🟡 Medium

- [x] **專案作品集區塊** **（done）**：放上花蓮交通e點通（公車動態）與內政部全球資訊網，附實際操作的示範 GIF（按鈕開啟對話框觀看；`public/projects/`，錄製腳本 `scripts/record-project-demos.py`），放在解題故事與技術棧之間，並與哈瑪星的經歷互相連結
  - [x] **內政部全球資訊網卡片的敘述** **（done）**：你已確認沿用主檔的「為內政部共用平台建構 ETL，每日節省 3.5 小時」
  - [x] 兩個專案寫進主檔的專案清單 **（done）**
- [x] **解題故事區塊（Approach）** **（done）**：依 Claude Doc「Domain know-how 與 Solution workflow 盤點」，放上 4 則 Solution workflow 與 3 則 Domain know-how，放在經歷與專案作品集之間，點開看完整過程，並與經歷互相連結
  - [ ] 缺口：缺陷影像為什麼需要彩色化（一句）；兩次對帳事件之後是否再發生、週結是否與合作業者對齊（一句）
  - [x] 履歷主檔與查證不一致 **（done）**：封存「壓縮＋較大區塊」與「單檔寫入限制」、API −61%、權重調整 3 天 → 2 天，已在主檔的中文與 English 分頁以建議的形式提出修正，待你逐張接受；網站經歷與 Highlights 的封存敘述已改為「每秒約 3 次寫入、gzip 壓縮使上傳流量減少 17 倍、之後每次只封存新增資料」
- [ ] **更多可以公開的專案作品**（參考網站有 39 個專案，你目前只有 1 個）。每個專案請提供：
  - 名稱、你的角色、期間
  - 問題：當時遇到什麼狀況
  - 方法：用了哪些技術，做了什麼取捨
  - 結果：量化數據，**以及誠實的限制說明**（例如「僅為預估值」、「未正式上線」）
  - 連結：GitHub、Demo、文章（如有）
  - 候選專案（履歷中已有素材，只缺故事與可公開程度）：封存管線效能調查、SKILL.md 資料源驗證工作流程、ASML 自動化測試框架、擔保品計分卡引擎、花蓮公車追蹤、台達 ESG 平台
- [x] **SKILL.md／CLAUDE.md 範例** **（done：已決定）**：整理成一篇文章，不另開 repo；併入 Low 的「技術文章／部落格」主題清單
- [x] **技術熟練度分級** **（done）**：不用自評等級，改成依履歷分三層（核心技術／實戰經驗／其他工具），並從任職期間算出每項技術的年資與經歷段數；點選技術可篩選經歷。對照表在 `src/app/i18n/stack.ts`
- [x] **英文版內容** **（done）**：依 `resume_en.pdf` 改寫用詞與語氣，放在 `/en/`，右上角可切換中文／EN；文案在 `src/app/i18n/en.ts`
  - 與中文版一致：第三方客戶名稱匿名；ESG 查詢時間（1.1s → 0.7s）與一卡通可用性（99.9%）已依確認後的數字放上
  - 英文履歷本身待修正：「4,500K data gaps」→ 4.5M、「review time by 50」缺 %、「achieving 14% uptime」語意不通、「Chung Hsin」→ Hsing、Micah Group 期間寫「現在」但中文版為 2026.11 結束、多處「millions / hundreds of thousands」後缺 of
  - [x] 待你校稿：About 與 Hero 的英文語氣是否符合你想呈現的樣子 **（done）**
- [x] **多國語言同步機制** **（done）**：新增 `.claude/skills/i18n-sync/SKILL.md`，以及檢查各語言結構一致的測試 `src/app/i18n/content.spec.ts`
- [ ] **日文版**：待建立日文履歷後再實作（流程見 `.claude/skills/i18n-sync/SKILL.md`）

### 🟢 Low

- [ ] **技術文章／部落格**：是否有已發表的文章（Medium、HackMD、iThome 等）？請提供連結。若沒有，請確認是否要先規劃 3～5 個主題，例如：
  - 「213 GB 的資料表為什麼選擇 Partitioning，而不是 VACUUM FULL」
  - 「上傳要 3 天：找出 Google Drive API 的真正瓶頸」
  - 「用 SKILL.md 把新資料源的整合時間從 2 週縮短到 3 天」
  - 「優雅地關閉一個產品：213 GB、16 項服務、零資料遺失」
- [ ] **獎項／證照／競賽**（參考網站有附上證書圖片作為佐證）：如果有，請提供年份、名稱、主辦單位與圖片
- [ ] **推薦語／合作回饋**：如果前主管或客戶的推薦語可以公開引用，請提供
- [x] **個人化的一句話主張** **（done）**：已在 About 與「我怎麼解決問題」的開頭呼應「走進問題現場」。原本的問題：參考網站有一句貫穿全站的研究方向「檢查通過，不代表系統做對了」。你目前的「走進問題現場，把需求做成能上線的軟體」已經很好，請確認是否要在 About 或專案敘事中更一致地呼應這句話

---

## 2. 待補充的內容區塊

| 優先 | 區塊 | 內容來源 | 狀態 |
|---|---|---|---|
| 🔴 High | About 改寫（年資、職稱、領域軌跡、AI 原生開發） | 履歷 | ✅ done |
| 🔴 High | Highlights 02／03 加入量化數據 | 履歷 | ✅ done |
| 🔴 High | Experience 時間軸（8 段） | 履歷 | ✅ done（客戶名稱暫時匿名） |
| 🔴 High | 聯絡方式：Email、GitHub、LinkedIn | 履歷＋使用者提供 | ✅ done |
| 🟡 Medium | 數字摘要列（例如：9+ 年經驗、8 家公司、6 個產業、1,790 萬筆每日快照） | 履歷 | 可直接做 |
| 🟡 Medium | Skills 技術棧分類 | 履歷＋使用者確認 | ✅ done；依履歷分層＋年資，技術對照已確認 |
| 🟡 Medium | 專案作品集（問題／方法／結果格式） | 使用者提供＋主檔 | ✅ 公部門網站 2 個 done；其他專案缺故事與可公開範圍 |
| 🟡 Medium | 解題故事（Solution workflow／Domain know-how） | 盤點文件＋repo 查證 | ✅ done；2 則故事各缺一句 |
| 🟡 Medium | 學歷與語言 | 履歷 | ✅ done |
| 🟢 Low | 文章／開發日誌 | 待提供 | 缺內容 |
| 🟢 Low | 獎項／證照 | 待提供 | 未知是否有 |
| 🟢 Low | 英文版（i18n） | resume_en.pdf | ✅ done |
| 🟢 Low | 日文版 | 待提供日文履歷 | 未開始；建立日文履歷後再實作 |
| 🟢 Low | 履歷 PDF 下載連結 | 待提供公開版 | 需要決定 |

---

## 3. 建議執行順序

1. **High**：確認揭露範圍 → 把確認過的內容補回履歷 PDF → ~~確認技術與經歷的對照 → 改寫 About → 為 Highlights 補上數據 → 新增 Experience → 補上 LinkedIn 與 GitHub~~（done）
2. **Medium**：數字摘要列 → ~~Skills~~（done）→ ~~公部門網站作品集~~（done）→ ~~解題故事~~（done）→ 2～3 個新專案（問題／方法／結果）→ ~~學歷與語言~~（done）
3. **Low**：文章 → 獎項 → ~~英文版~~（done）→ 履歷下載
