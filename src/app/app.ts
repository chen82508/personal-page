import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Eyebrow } from './ui/eyebrow';
import { HighlightCard, HighlightIcon, HighlightLink } from './ui/highlight-card';
import { Status } from './ui/status-tag';

type Highlight = {
  index: string;
  status: Status;
  label: string;
  icon: HighlightIcon;
  title: string;
  body: string;
  delay: string;
  links?: HighlightLink[];
};

type Job = {
  period: string;
  company: string;
  role: string;
  project: string;
  points: string[];
};

type SkillGroup = {
  index: string;
  title: string;
  items: string[];
  delay: string;
};

type ContactLink = {
  label: string;
  value: string;
  href: string;
  external: boolean;
};

@Component({
  selector: 'app-root',
  imports: [ButtonDirective, Card, Eyebrow, HighlightCard],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly highlights: Highlight[] = [
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
      body: '為彙整 9 家預測市場交易所的資料平台建置擷取管線，每日處理 1,270 萬至 1,790 萬筆價格快照，資料完整性提升 23%，並補齊 450 萬筆資料缺口。我主導了封存管線的效能調查，提出的方案預估可將上傳時間從 3～4 天縮短到 2 小時以內。產品下線時，我封存了 213 GB 資料、除役 16 項服務，零資料遺失；之後經授權整理為開源的作品快照。',
      delay: 'delay-100',
      links: [
        { label: '線上展示', href: 'https://chen82508.github.io/pmi-platform/' },
        { label: '查看原始碼', href: 'https://github.com/chen82508/pmi-platform' },
      ],
    },
    {
      index: '03',
      status: 'done',
      label: 'DEPLOYED',
      icon: 'stack',
      title: 'ASML Experience',
      body: '受公司派駐 ASML，負責 e-Beam 檢測系統的模組化 .NET 架構，並主導核心模組從 .NET Framework 遷移到 .NET Core。我以 Python 與 TestComplete 建立自動化測試框架，將各機台組態的測試涵蓋率從 11% 提升到 32%；也撰寫 UML 設計文件，讓 PM、FAE 與 QA 對需求達成共識。',
      delay: 'delay-200',
    },
  ];

  // 第三方客戶名稱暫以匿名描述，待確認可公開範圍（見 docs/TODO.md）
  protected readonly experience: Job[] = [
    {
      period: '2026.03 – 2026.11',
      company: 'Micah Group',
      role: '資深後端與基礎設施工程師',
      project: '預測市場聚合指數平台',
      points: [
        '跨 Web 與 API 來源，建置 9 家預測市場交易所的資料擷取管線，每日維持 1,270 萬至 1,790 萬筆價格快照；以多金鑰輪替與背景 API 補值，資料完整性提升 23%。',
        '在 Docker Compose 上運行 16 個擷取 sidecar 與多條背景工作佇列，以 Alembic 管理 PostgreSQL schema，並在上線時設定 CloudWatch 監控與 Slack 告警。',
        '撰寫 5 個 SKILL.md 工作流程，把新交易所的整合時間從約 2 週縮短到 3 天；主導產品下線，封存 213 GB 資料、除役 16 項服務，零資料遺失。',
      ],
    },
    {
      period: '2025.12 – 2026.03',
      company: 'GoCode Pte Ltd',
      role: '資深後端開發工程師（Node.js，約聘）',
      project: 'B2B／B2C 互動遊戲平台',
      points: [
        '以 NestJS 建構 RESTful 服務，並設計封裝遊戲邏輯、狀態轉換與規則驗證的遊戲引擎層，支援 3 項平台整合。',
        '以 Redis 處理快取與狀態管理、以 Kafka 進行非同步事件串流，讓高吞吐量服務解耦，效能提升 26%。',
        '主導以標準化模組範本與架構準則進行的重構，並在團隊中定期執行 code review。',
      ],
    },
    {
      period: '2025.07 – 2025.12',
      company: '業外接案',
      role: '後端開發工程師（兼職）',
      project: 'ESG 顧問平台',
      points: [
        '建構具備 Pydantic 驗證、集中式日誌、統一例外處理與認證授權的 FastAPI 服務，7 項關鍵服務指標提升 23%。',
        '整合 GCP BigQuery 處理數百萬筆 ESG 資料，資料處理效率提升 17%；在 Cloud SQL 上設計 PostgreSQL schema 與索引，建立被 5 位開發者採用的 Alembic 遷移流程。',
      ],
    },
    {
      period: '2023.05 – 2025.09',
      company: 'Zealogics Taiwan',
      role: 'Sr. C# 開發工程師',
      project: 'ASML e-Beam 檢測系統（客戶端駐點）',
      points: [
        '設計並維護高精密 e-Beam 檢測系統的模組化 .NET 架構，並主導核心模組從 .NET Framework 遷移到 .NET Core。',
        '以 Python 與 TestComplete 建立含可重用模擬函式庫的自動化框架，各機台組態的測試涵蓋率從 11% 提升到 32%。',
        '交付 3 份 UML 設計文件，讓 PM、FAE 與 QA 對可行性與客戶需求達成共識；測試驗證報告縮短了客戶的 UAT 週期。',
      ],
    },
    {
      period: '2022.02 – 2023.04',
      company: 'PTMB Holding',
      role: '資深軟體工程師',
      project: '企業與金融平台',
      points: [
        '開發擔保品計分卡引擎，自動化貸款審批中的信用風險評估，評估效率提升 27%，審查時間減少 50%。',
        '以 ASP.NET Core 與 Vue.js 建構人資與統計 SPA，搭配 MSSQL 查詢調校與自動化報表，處理時間從 1.5 週縮短到 4 天。',
        '透過跨系統 Oracle 檢視表與統一權限邏輯，在 ESP 與 ERP 之間實作 SSO，支援 3 個整合系統。',
      ],
    },
    {
      period: '2019.08 – 2022.01',
      company: '哈瑪星科技',
      role: '軟體工程師',
      project: '公共部門與企業專案',
      points: [
        '為花蓮即時公車追蹤網站整合 PTX 與 ArcGIS API，並以排程快取降低尖峰時段的依賴，外部 API 呼叫次數減少 53%。',
        '主導國營企業的 SharePoint 平行遷移，透過跨平台對應與驗證達到 100% 資料一致。',
        '為政府共用平台建構整合多個機關資料集的 ETL 管線；以 Factory Pattern 與依賴注入重構多格式匯出引擎，匯出速度快 41%。',
      ],
    },
    {
      period: '2018.10 – 2019.08',
      company: '一卡通票證（iPASS）',
      role: '軟體工程師',
      project: '電子支付系統',
      points: [
        '整合多家銀行與特約商店的支付 API，並負責設計文件、負載測試與對帳機制，支撐 24/7 的交易穩定性。',
        '主導將交易記錄 ID 從序列值遷移到 GUID 以支援分散式環境，並建構月結儲存程序，處理數千萬筆記錄。',
      ],
    },
    {
      period: '2017.05 – 2018.10',
      company: '驊宏資通',
      role: '軟體工程師',
      project: '銀行解決方案',
      points: [
        '開發銀行擔保品管理系統的核心模組，以 MSSQL 驗證規則確保信用評估資料的正確性。',
        '維護銀行的授信與放款系統，負責 Oracle 資料遷移與日常的根本原因分析，系統可靠性提升 13%。',
      ],
    },
  ];

  protected readonly skills: SkillGroup[] = [
    { index: '01', title: '程式語言', items: ['Python', 'C#', 'TypeScript', 'Node.js', 'SQL'], delay: '' },
    {
      index: '02',
      title: '框架與 API',
      items: ['NestJS', 'FastAPI', 'ASP.NET Core', 'RESTful API', 'WebSocket', 'Angular', 'Vue.js'],
      delay: 'delay-100',
    },
    {
      index: '03',
      title: '資料與訊息',
      items: ['PostgreSQL', 'MSSQL', 'Oracle', 'Redis', 'Kafka', 'BigQuery', 'ETL', 'Alembic'],
      delay: 'delay-200',
    },
    {
      index: '04',
      title: '雲端與基礎設施',
      items: ['AWS EC2', 'AWS CloudWatch', 'GCP Cloud SQL', 'Docker Compose', 'Azure DevOps', 'Git'],
      delay: '',
    },
    {
      index: '05',
      title: 'AI 原生開發',
      items: ['Claude Code', 'CLAUDE.md', 'SKILL.md 工作流程', 'Context 設計'],
      delay: 'delay-100',
    },
    {
      index: '06',
      title: '測試與品質',
      items: ['pytest', 'TestComplete', 'SQA', 'UAT 驗證報告', '效能基準測試'],
      delay: 'delay-200',
    },
  ];

  protected readonly contacts: ContactLink[] = [
    { label: 'Email', value: 'chen82508@gmail.com', href: 'mailto:chen82508@gmail.com', external: false },
    { label: 'GitHub', value: 'github.com/chen82508', href: 'https://github.com/chen82508', external: true },
    {
      label: 'LinkedIn',
      value: 'in/kaitochen-15800326ta',
      href: 'https://www.linkedin.com/in/kaitochen-15800326ta/',
      external: true,
    },
  ];

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // 捲動淡入：偏好減少動畫或不支援 IntersectionObserver 時直接全部顯示
    afterNextRender(() => {
      const els = this.host.nativeElement.querySelectorAll<HTMLElement>('.reveal');
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!('IntersectionObserver' in window) || reduceMotion) {
        els.forEach((el) => el.classList.add('in-view'));
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
      );
      els.forEach((el) => io.observe(el));
      destroyRef.onDestroy(() => io.disconnect());
    });
  }
}
