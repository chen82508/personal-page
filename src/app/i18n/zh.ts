import { SiteContent } from './types';

// 已確認可公開的客戶（ASML、中油、凱基銀行、臺灣銀行、LINE Pay、內政部、花蓮縣政府）寫出名稱；
// 其餘第三方客戶仍以匿名描述，待確認可公開範圍（見 docs/TODO.md）
export const ZH: SiteContent = {
  htmlLang: 'zh-Hant',
  meta: {
    title: 'Kaito',
    description:
      'Kaito（陳凱樺）的個人網頁：資深後端與基礎設施工程師，9 年以上高資料量與金融級系統經驗，開放 Forward Deployed Engineer（FDE）職缺與自主接案合作。',
  },
  switcher: { current: '中文', other: 'EN', otherLang: 'en', href: 'en/' },
  homePath: '',
  newTab: '（另開新分頁）',
  demo: { label: '觀看操作示範', close: '關閉' },
  hero: {
    status: '目前狀態：開放 FDE 職缺與接案合作',
    headline: [['走進問題現場，'], ['把需求', '做成能上線的軟體。']],
    tagline: 'From the problem on the ground to software in production.',
    comment: '// open to FDE roles & freelance projects',
  },
  about: {
    title: '關於我',
    html: '我是 <strong>Kaito</strong>，一名有 <strong>9 年以上</strong>經驗的<strong>資深後端與基礎設施工程師</strong>，專長是高資料量與金融級系統。我從電子支付與銀行放款系統起步，做過公部門的資料整合，也曾受公司派駐 <strong>ASML</strong>，負責 e-Beam 檢測系統的 .NET 開發與自動化測試（SQA）。最近一段時間，我在 AWS 上為<strong>預測市場資料平台</strong>建置了橫跨 9 家交易所的資料擷取管線，並負責監控告警、效能調查，最後也親手讓產品安全下線。我也習慣以 <strong>AI 原生</strong>的方式開發：透過 CLAUDE.md 與 SKILL.md 設計 context 與工作流程，讓 AI 代理產出可靠的程式碼，把新資料源的整合時間從約 2 週縮短到 3 天。現在我把重心放在 <strong>Forward Deployed Engineer（FDE）</strong>與<strong>自主接案</strong>：走進問題現場，直接面對客戶的真實問題，把需求釐清、做出能用的系統，並陪它在現場穩定運作。對我來說，軟體不只是「能動」就好，而是要真的解決某個人的問題。',
  },
  highlights: {
    title: '接下來想做的，與做過的事',
    items: [
      {
        index: '01',
        status: 'active',
        label: 'OPEN TO WORK',
        icon: 'code',
        title: 'FDE × 自主接案',
        body: '開放 Forward Deployed Engineer（FDE）職缺與接案合作：從需求訪談、問題釐清，到資料管線、後端服務的實作與上線，都能一路接手。',
        delay: '',
      },
      {
        index: '02',
        status: 'done',
        label: 'SHIPPED',
        icon: 'project',
        title: '預測市場資料平台',
        body: '為彙整 9 家預測市場交易所的資料平台建置擷取管線，每日維持 1,270 萬至 1,790 萬筆價格快照，並以跨來源核對填補 450 萬筆資料，將指數必要欄位缺漏率從 33% 降至 10%。我剖析封存管線、找出 Google 雲端硬碟 API 的寫入瓶頸，改善後傳輸量減少 17 倍，首次封存之後每次只封存新增資料，3 小時內完成。產品下線時，我除役 16 項服務、封存 213 GB 資料，零資料遺失；之後經授權整理為開源的作品快照。',
        delay: 'delay-100',
        demo: {
          src: 'projects/pmi-platform.webp',
          alt: '預測市場資料平台的操作示範：指數列表、戰爭指數的歷史走勢與提示框、構成分數的各個市場，以及回測重播',
          width: 1600,
          height: 950,
        },
        links: [{ label: '查看原始碼', href: 'https://github.com/chen82508/pmi-platform' }],
      },
      {
        index: '03',
        status: 'done',
        label: 'DEPLOYED',
        icon: 'stack',
        title: 'ASML Experience',
        body: '受公司派駐 ASML，設計並維護 e-Beam 檢測系統的模組化 .NET 元件（含複雜硬體整合）。我以 Python 與 TestComplete 建立自動化測試框架，新增 70 個以上測試案例，程式碼涵蓋率從 11% 提升到 32%，回歸測試從 1 小時以上縮短到約 20 分鐘；也撰寫 UML 設計文件，讓 PM、FAE 與 QA 對需求達成共識。',
        delay: 'delay-200',
      },
    ],
  },
  experience: {
    title: '經歷',
    projectLabel: '專案：',
    detailsLabel: '細節',
    earlierLabel: '更早的經歷',
    filterLabel: '篩選：',
    clearLabel: '清除篩選',
    stackLabel: '使用的技術',
    relatedLabel: '相關作品：',
    relatedSeparator: '、',
    storiesLabel: '解題故事：',
    timeline: {
      label: '任職時間總覽',
      permanent: '正職',
      contract: '約聘',
      partTime: '兼職／業外',
    },
    jobs: [
      {
        key: 'micah',
        period: '2026.03 – 2026.11',
        company: 'Micah Group',
        role: '資深後端與基礎設施工程師',
        project: '預測市場聚合指數平台',
        headline: { value: '2 週 → 3 天', label: '單家交易所的整合時間' },
        points: [
          '主責 9 家預測市場交易所的爬蟲與 API 擷取，每日維持 1,270 萬至 1,790 萬筆價格快照；以多金鑰輪替、背景 API 補值與外部合約 ID 跨來源核對（填補 450 萬筆），將指數必要欄位缺漏率從 33% 降至 10%。',
          '於 AWS EC2 以 Docker Compose 執行 16 個擷取 sidecar 與多條工作佇列，以 Alembic 管理 PostgreSQL 遷移；上線時設定 5 條 CloudWatch 告警與 Slack 通知，在影響使用者前攔截 30 次以上資源事件。',
          '剖析封存管線並基準測試 gzip、zstd、xz 與欄位導向格式，找出瓶頸是 Google 雲端硬碟每秒約 3 次的寫入（依檔案數計算，而非位元組）；改採 gzip 壓縮後上傳流量減少 17 倍，首次封存之後每次只封存新增資料，3 小時內完成。',
          '撰寫 5 個 SKILL.md 工作流程，把前 7 家交易所的單家整合時間從約 2 週縮短到 3 天；執行 CEO 決定的產品下線，除役 16 項服務、封存 213 GB 資料，零資料遺失。',
        ],
      },
      {
        key: 'gocode',
        period: '2025.12 – 2026.03',
        company: 'GoCode Pte Ltd',
        role: '資深後端開發工程師（Node.js，約聘）',
        project: 'B2B／B2C 互動遊戲平台',
        headline: { value: '3 個平台', label: '遊戲引擎層服務的內部平台' },
        points: [
          '以 NestJS 建構 RESTful 服務與遊戲引擎層（遊戲邏輯、狀態轉換、規則驗證），服務後台管理、遊戲即時運算、錢包扣款與退款 3 個內部平台。',
          '導入 Redis 處理快取與連線狀態，實作 Kafka 事件串流介面以解耦服務（交接時尚未部署）；以 Swagger（OpenAPI）文件化上下游的 API 契約，並以 Jest 撰寫單元測試。',
          '在 6 人團隊中兼任 Tech Lead：以 7 組標準化模組範本領導重構，每月審查 10 至 20 個 PR。',
        ],
      },
      {
        key: 'freelance-esg',
        period: '2025.07 – 2025.12',
        company: '業外接案',
        role: '後端開發工程師（兼職）',
        project: 'ESG 顧問平台',
        headline: { value: '−23%', label: '7 項平台功能的平均處理時間' },
        points: [
          '以 FastAPI 建構支撐 7 項平台功能（問卷填寫、分數計算、ESG 結果分析、企業間成效比較、改善方案提問、報告產出、歷次結果比較）的 RESTful 服務，在全數符合驗收標準下，平均處理時間縮短 23%。',
          '加入 Pydantic 驗證、集中式日誌中介軟體、統一例外處理與認證授權；在 GCP Cloud SQL 設計 PostgreSQL schema 與索引，建立被 5 位開發者採用的 Alembic 遷移流程，並整合 BigQuery 處理百萬筆級 ESG 資料。',
          '以 WebSocket 與訊息佇列建構通知機制，依類別多對多推播新文章給訂閱者，預估每日數百則。',
        ],
      },
      {
        key: 'zealogics',
        period: '2023.05 – 2025.07',
        company: 'Zealogics',
        role: '資深 C# 開發工程師',
        project: 'ASML e-Beam 檢測系統（客戶端駐點）',
        headline: { value: '11% → 32%', label: '程式碼涵蓋率' },
        points: [
          '設計並維護高精密 e-Beam 檢測系統的模組化 .NET 元件（含複雜硬體整合），以 NUnit 撰寫單元測試。',
          '以 Python 與 TestComplete 建立自動化框架與可重用的模擬函式庫：新增 70 個以上自動化測試案例，涵蓋的機器組態從約 10 個增至 30 個以上，程式碼涵蓋率從 11% 提升到 32%，穩定功能的回歸測試從 1 小時以上縮短到約 20 分鐘。',
          '撰寫 UML 設計文件，讓 PM、FAE 與 QA 對可行性與客戶需求達成共識（交付 3 份設計），並產出客戶 UAT 用的測試驗證報告。',
        ],
      },
      {
        key: 'ptmb',
        period: '2022.02 – 2023.04',
        company: 'PTMB Holding',
        role: '資深軟體工程師',
        project: '企業與金融平台',
        headline: { value: '−50%', label: '貸款審查時間' },
        points: [
          '開發擔保品計分卡引擎，自動化貸款審批的信用風險評估；依鑑價師週報，評估效率提升 27%、審查時間減少 50%。',
          '獨立開發人資與統計 SPA（ASP.NET Core API、Vue.js 前端），以標準化 .docx、.xlsx、.pdf 報表取代格式不一的 Excel；MSSQL 查詢從 0.9 秒調校到 0.55 秒，人資處理時間從 1.5 週縮短到 4 天。',
          '以 NestJS 與嚴格驗證管線建構資產估值平台的大量資料同步 API；透過跨系統 Oracle 檢視表與統一權限邏輯，為 ArgoERP、Vitals/KM 系統與案件流程系統實作 SSO。',
        ],
      },
      {
        key: 'hamastar',
        period: '2019.08 – 2022.01',
        company: '哈瑪星科技',
        role: '軟體工程師',
        project: '公部門與企業專案',
        headline: { value: '−53%', label: '尖峰時段的外部 API 呼叫' },
        points: [
          '將 PTX 與 ArcGIS API 整合至花蓮即時公車入口網站，並依設計師的 Figma 稿以 ASP.NET Web Forms 開發前端；以排程快取讓尖峰時段的外部 API 呼叫減少 53%。',
          '為內政部共用平台建構整合多個機關數十萬筆資料的 ETL，每日節省 3.5 小時作業時間。',
          '主導中油的 SharePoint 平行遷移，以跨平台對應與驗證達到 100% 資料一致；建構 XLSX、ODS、PDF 多格式匯出引擎，以工廠模式與依賴注入解耦其行動辦公 API，匯出速度提升 41%。',
        ],
      },
      {
        key: 'ipass',
        period: '2018.10 – 2019.08',
        company: '一卡通票證（iPASS）',
        role: '軟體工程師',
        project: '電子支付系統',
        headline: { value: '數千萬筆', label: '月結算預存程序處理的記錄' },
        points: [
          '於系統上線前半年串接一家銀行與多家特約商店（免稅店、計程車隊、咖啡與便利商店連鎖）的支付 API，提供設計文件、負載測試與對帳機制，以支援 24/7 交易。',
          '提議將交易記錄 ID 由序列值改為 GUID 以支援分散式成長，經上級與 DBA 研議後與組長共同執行，資料零遺漏；並建構處理數千萬筆記錄的月結算預存程序。',
        ],
      },
      {
        key: 'azion',
        period: '2017.05 – 2018.10',
        company: '驊宏資通',
        role: '軟體工程師',
        project: '銀行解決方案',
        headline: { value: '2 家銀行', label: '擔保品管理與授信放款系統' },
        points: [
          '以 ASP.NET Web Forms（C#）開發凱基銀行擔保品管理系統的核心模組，以 MSSQL 驗證規則確保信用評估資料正確。',
          '維護臺灣銀行的授信與放款系統（ASP.NET Web Forms、VB.NET、Oracle）：執行資料遷移，並針對客戶回報的事件進行根本原因分析與 patch 交付。',
        ],
      },
    ],
    education: { school: '國立中興大學 應用數學系 學士', years: '2011 – 2016' },
    languages: [
      { name: '中文', level: '母語' },
      { name: '台語', level: '母語' },
      { name: '英文', level: '中級' },
      { name: '日文', level: '基礎' },
    ],
  },
  projects: {
    title: '專案作品集',
    intro:
      '我參與開發、至今仍在線上運作的公部門網站，畫面大致維持我負責時的樣貌。動畫是 2026 年 11 月實際操作網站的錄影。',
    tryLabel: '試試看：',
    visitLabel: '前往網站',
    stackLabel: '使用的技術',
    items: [
      {
        key: 'hualien-bus',
        job: 'hamastar',
        title: '花蓮交通e點通：公車動態',
        client: '花蓮縣政府',
        body: '將 PTX 與 ArcGIS API 整合進即時公車動態查詢，並依設計師的 Figma 稿以 ASP.NET Web Forms 開發前端；以排程快取讓尖峰時段的外部 API 呼叫減少 53%。',
        tryIt: '查公車 → 公車動態 → 花蓮市區線 → 311、311A 或 301',
        media: {
          src: 'projects/hualien-bus.webp',
          alt: '在花蓮交通e點通選擇花蓮市區線的 311 路線，畫面列出各站牌的預估到站時間，並在地圖上標示公車位置',
          width: 1600,
          height: 1000,
        },
        href: 'https://110traffic.hl.gov.tw/',
        tech: ['C# / .NET', 'ASP.NET Web Forms', 'PTX API', 'ArcGIS API'],
      },
      {
        key: 'moi',
        job: 'hamastar',
        title: '內政部全球資訊網',
        client: '內政部',
        body: '為內政部共用平台建構 ETL，整合多個機關的數十萬筆資料，每日節省 3.5 小時作業時間。',
        tryIt: '首頁的主題服務選單，以及訊息快遞、快捷服務的分頁',
        media: {
          src: 'projects/moi.webp',
          alt: '內政部全球資訊網首頁：展開主題服務選單、切換訊息快遞與快捷服務的分頁，並向下瀏覽各區塊',
          width: 1600,
          height: 1000,
        },
        href: 'https://www.moi.gov.tw/',
        tech: ['C# / .NET', 'ETL'],
      },
    ],
  },
  stories: {
    title: '我怎麼解決問題',
    intro:
      '走進問題現場之後，我怎麼判斷、怎麼動手？以下從做過的事情裡整理出來。點開卡片，可以看到背景、判斷、考慮過的做法與結果。',
    groups: {
      workflow: { title: 'Solution workflow', note: '在不同經歷裡反覆用到的解題方法' },
      domain: { title: 'Domain know-how', note: '在產業裡實際踩過、學到的規則與限制' },
    },
    readLabel: '看完整過程',
    stepLabels: {
      context: '背景',
      judgment: '判斷',
      options: '考慮過的做法',
      result: '結果',
    },
    jobsLabel: '相關經歷',
    items: [
      {
        key: 'measure-first',
        kind: 'workflow',
        title: '先量測再動手：封存為什麼比預期慢',
        short: '封存瓶頸',
        summary: '上傳時間遠超預期。實測後才確定，卡住的是雲端硬碟的寫入次數，而不是檔案大小。',
        metric: { value: '17×', label: '上傳流量減少' },
        jobs: ['micah'],
        steps: {
          context:
            '預測市場平台要把 7.2 億至 11 億筆價格快照封存到 Google 雲端硬碟。流程是檔案上傳成功後，才刪除資料庫中對應的資料，所以上傳速度決定資料庫能多快釋出空間。',
          judgment:
            '從 Slack 通知的歷程看出，檔案從產生到上傳成功的間隔明顯比預期長；當時檔案以未壓縮的 JSON 上傳。比起自己花時間摸索，我直接請 CTO 快速指導，先對每個檔案做 gzip 壓縮。',
          options:
            '我以真實的封存檔實測 gzip、zstd、xz 與欄式格式，檔案層壓縮就有 17 至 38 倍。但上傳受雲端硬碟每秒 3 次寫入的限制，看的是檔案數而不是位元組：只壓縮能省流量，時間不會變短。最後選 gzip 而不是 zstd：標準函式庫就有，而主機的瓶頸在磁碟 I/O，壓縮速度的差異不影響總時間。也評估過先暫存到 Redis，但會和已經在用 swap 的 PostgreSQL 搶記憶體，所以沒有採用。',
          result:
            '上傳流量與雲端硬碟用量減少約 17 倍。首次封存 3 至 4 天，之後每次只封存新增的資料，3 小時內完成，並可與其他服務同時執行。',
        },
        figure: null,
      },
      {
        key: 'data-quality',
        kind: 'workflow',
        title: '資料品質閉環：缺漏率 33% → 10%',
        short: '資料缺漏',
        summary: '先定義哪些欄位必要，再依原因分類缺漏、對症補齊，最後承認剩下的是來源本身沒有。',
        metric: { value: '33% → 10%', label: '指數必要欄位缺漏率' },
        jobs: ['micah'],
        steps: {
          context:
            '平台彙整 9 家預測市場交易所的資料來計算指數，但指數必要欄位的缺漏率有 33%。必要欄位是投資人關注的因子：24 小時成交量、目前成交的預測機率，以及指數採用的各合約 yes 與 no 機率。',
          judgment:
            '缺漏多半來自產品初期沒有逐一比對各家 API 的 schema 與欄位意涵。最典型的是成交量的定義不同：Kalshi 只提供累積成交量，Polymarket 另外提供 24 小時成交量，以 Playwright 爬網頁的交易所則連成交量都拿不到。',
          options:
            '我依原因分別處理：多金鑰輪替、以背景 API 補充純網頁來源、從快照表推導 24 小時成交量、以外部合約 ID 跨來源核對，其中推導成交量補得最多。推導 Kalshi 的 24 小時成交量時，排除了兩種做法：每個市場再呼叫一次歷史 API（已每 60 秒輪詢 8 萬至 14 萬個市場，負載會翻倍），以及用 Redis 存檢查點（後端刻意只用 PostgreSQL）。最後在同一輪輪詢中，以一次有索引的查詢取出 24 小時前的累積量做差分；沒有參考值時寫入 NULL 而不是 0，避免污染指數權重。',
          result:
            '缺漏率從 33% 降到 10%，跨來源核對填補了 450 萬筆資料；剩下的 10% 是來源本身沒有提供。',
        },
        figure: null,
      },
      {
        key: 'zero-downtime',
        kind: 'workflow',
        title: '不停機的遷移：交易 ID 從序列值換成 GUID',
        short: '不停機遷移',
        summary: '難的不是 GUID 本身，而是在 24 小時運作的支付系統上，不中斷服務地完成切換。',
        metric: { value: '0', label: '筆資料遺漏' },
        jobs: ['ipass', 'micah'],
        steps: {
          context:
            '電子支付系統 24 小時運作，交易記錄以資料庫的自增序列值當 ID。為了支援分散式成長，我提議改用 GUID。',
          judgment:
            '真正的難題是：在不中斷服務的前提下，怎麼把 ID 從序列值換成 GUID。提議經上級與 DBA 研議後，由我與組長共同執行。',
          options:
            '分五步切換：新增可為空值、帶唯一索引的 GUID 欄位 → 應用程式雙寫 → 背景分批回填歷史資料 → 切換讀取與對外識別 → 轉換主鍵並刪除舊的自增欄位。後來執行 Micah 的產品下線時，也用同樣的思路：每個封存檔上傳後，比對雲端回報的 MD5 與檔案大小，一致才刪除資料庫中對應的資料。',
          result:
            'GUID 遷移資料零遺漏。Micah 產品下線時，除役 16 項服務、封存 213 GB 資料，同樣零遺失。',
        },
        figure: null,
      },
      {
        key: 'skill-gates',
        kind: 'workflow',
        title: '把品質關卡寫成 SKILL.md',
        short: 'SKILL.md 品質關卡',
        summary: '把每次踩過的坑寫成 AI 必須遵守的流程，讓新交易所的整合不再靠人工逐欄比對。',
        metric: { value: '2 週 → 3 天', label: '單家交易所的整合時間' },
        jobs: ['micah'],
        steps: {
          context:
            '每整合一家交易所約需 2 週，多半花在人工比對欄位：早期開發爬蟲時用的 prompt，沒有對齊指數計算需要哪些欄位。',
          judgment:
            '我把整合規範寫成 5 個 SKILL.md，讓 Claude Code 依流程產出：文件規範、重構設計、品質關卡、交易所導入，以及非同步迴圈安全。交易所導入規定先實測上游 API 再寫程式，每條規則都附上一次「健康檢查正常、資料卻出錯」的事件，例如某個查詢預設只回傳 20 筆，或以非唯一欄位分頁，每輪漏抓 500 至 800 筆。',
          options:
            'AI 的產出必須通過品質關卡：只對修改的檔案執行 ruff 與 strict mypy，印出 PASSED 才算完成，再跑一次完整的 pytest。新交易所還要有模擬真實上游行為的測試（預設筆數上限、429／5xx、錯誤格式），新功能預設關閉並附上關閉時的測試；熱門資料表的新 SQL，要先在約 800 萬列的模擬資料上檢查執行計畫。',
          result: '前 7 家交易所的單家整合時間從約 2 週縮短到 3 天，最終共整合 9 家。',
        },
        figure: null,
      },
      {
        key: 'reconciliation',
        kind: 'domain',
        title: '電子支付：對帳報表出錯就是資安事件',
        short: '支付對帳',
        summary: '兩次對帳事件之後，我把修正放進程式結構與上線流程，讓同樣的錯誤沒有機會再發生。',
        metric: null,
        jobs: ['ipass'],
        steps: {
          context: '電子支付系統每月結算數千萬筆交易，並提供對帳報表給有申請的銀行與特約商店。',
          judgment:
            '曾發生兩次被歸類為資安問題的事件。一是以 .NET DataSet 暫存資料時，沒有先清空前一家商店的資料，就接著查詢、產生報表。二是配合 LINE Pay 把月結改為週結時，測試案例涵蓋不足，算出的帳目與 LINE Pay 對不齊。',
          options:
            '第一件，我把「查詢每家商店的帳務前先清空容器」以 Factory Pattern 包進 base class，並要求相關功能實作對應的 interface，讓其他商店的帳務不可能出現在錯的報表裡。第二件，我與主責的 mentor 逐行確認 stored procedure，補上更多元的週結測試案例（含破壞性測試），逐一比對預期結果；檢查清單全部勾選後，才填單部署。',
          result: '清空容器成為 base class 的固定步驟；週結規則在部署前通過補齊後的完整測試清單。',
        },
        figure: null,
      },
      {
        key: 'scorecard',
        kind: 'domain',
        title: '擔保品計分卡：讓鑑價師自己維護公式',
        short: '擔保品計分卡',
        summary: '評分規則會隨鑑價實務調整，所以不寫死在程式裡，而是交給最懂規則的人。',
        metric: { value: '−50%', label: '審查時間' },
        jobs: ['ptmb'],
        steps: {
          context: '我為貸款審批開發擔保品計分卡引擎，自動化擔保品的信用風險評估。',
          judgment:
            '評分規則會隨鑑價實務調整，所以不寫死在程式裡，而是在後台提供公式設定與維護：以加法搭配正負係數與乘除，讓鑑價師自行調配各因子的權重與加減分。',
          options:
            '公式建立後可以觸發試算，讓鑑價師確認取用的因子、係數與運算子是否正確；功能完成後，再以教育訓練說明使用方式。',
          result: '依鑑價師的週報，評估效率提升 27%，審查時間減少 50%。',
        },
        figure: null,
      },
      {
        key: 'defect-colormap',
        kind: 'domain',
        title: '半導體檢測：灰階缺陷影像的彩色化元件',
        short: '缺陷影像彩色化',
        summary: '在 ASML 的 e-Beam 檢測系統上，讓使用者看清影像的灰階分布，並自訂上色的色階。',
        metric: null,
        jobs: ['zealogics'],
        steps: {
          context: 'ASML e-Beam 檢測系統的缺陷影像（defect image）是 0 至 255 的灰階。',
          judgment:
            '我與一位同事分工：我負責操作介面與功能，同事負責讀取色彩設定、對應到每個 pixel 的 service。介面沿用系統既有的 WinForms，搭配開源套件 OxyPlot。',
          options:
            '介面以直方圖顯示目前影像在 0 至 255 各灰階值的 pixel 數，下方是 jet 預設色階：按下 Apply 直接套用，也可以在 x 軸上打點自訂色階，下方的色階對照會即時重新配色。OxyPlot 的擴充性有限，我逐項找到對應的解法。',
          result:
            '客戶沒有提供判讀成效的量化數字。同一段派駐中，我也依 SQA 部門累積的手動測試案例建立自動化測試：程式碼涵蓋率從 11% 提升到 32%，回歸測試從 1 小時以上縮短到約 20 分鐘。',
        },
        figure: {
          width: 640,
          height: 400,
          images: [
            {
              src: 'stories/defect-gray.webp',
              label: '原始灰階影像（0–255）',
              alt: '模擬的 e-Beam 灰階影像：等距的暗色直線之間有一處暗色橋接缺陷，下方是 0 到 255 的灰階色帶',
            },
            {
              src: 'stories/defect-jet.webp',
              label: '套用 jet 色階後',
              alt: '同一張影像套用 jet 色階：直線呈藍色、背景呈黃綠色，缺陷中心為深藍、周圍的亮暈為紅色，下方是對應的 jet 色帶',
            },
          ],
          note: '示意圖：以程式產生的模擬影像呈現，並非 ASML 的實際檢測資料。',
        },
      },
    ],
  },
  skills: {
    title: '技術棧',
    intro: '年資與經歷段數依任職期間計算，重疊的期間只算一次。點選技術，可以看到它用在哪幾段經歷。',
    tiers: {
      core: { title: '核心技術', note: '目前主力使用的技術。' },
      shipped: { title: '實戰經驗', note: '在正式專案中使用過。' },
      other: { title: '其他工具', note: '日常開發與 AI 原生開發的工具。' },
    },
    units: {
      year: { one: '年', other: '年' },
      month: { one: '個月', other: '個月' },
      role: { one: '段經歷', other: '段經歷' },
    },
    usedIn: '用在這些經歷',
  },
  contact: {
    title: '有需要落地的專案或職缺？歡迎聊聊',
    body: 'FDE 職缺、接案合作，或只是想交流技術，都歡迎與我聯絡。',
    primary: '聯絡我',
    secondary: '查看作品',
    location: '// 工作地點：高雄／遠端・可出差・接受海外遠端工作',
  },
};
