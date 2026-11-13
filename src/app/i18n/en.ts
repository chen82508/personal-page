import { SiteContent } from './types';

// Copy selected from the master resume (陳凱樺｜履歷主檔, English tab). Confirmed clients (ASML, CPC,
// KGI Bank, Bank of Taiwan, LINE Pay, the Ministry of the Interior, Hualien County Government) are
// named; other third-party clients stay anonymized to match the Chinese page (see docs/TODO.md).
export const EN: SiteContent = {
  htmlLang: 'en',
  meta: {
    title: 'Kaito Chen',
    description:
      'Kaito Chen — Senior Backend & Infrastructure Engineer with 9+ years in data-intensive and financial systems. Open to Forward Deployed Engineer (FDE) roles and freelance projects.',
  },
  switcher: { current: 'EN', other: '中文', otherLang: 'zh-Hant', href: './' },
  homePath: 'en/',
  newTab: '(opens in a new tab)',
  demo: { label: 'Watch demo', close: 'Close' },
  hero: {
    status: 'Open to FDE roles & freelance work',
    headline: [['Start where the problem is.'], ['Ship software that holds up in production.']],
    tagline: 'Backend & infrastructure engineer, 9+ years in data-intensive and financial systems.',
    comment: '// open to FDE roles & freelance projects',
  },
  about: {
    title: 'About Me',
    html: "I'm <strong>Kaito</strong>, a <strong>senior backend &amp; infrastructure engineer</strong> with <strong>9+ years</strong> of experience building data-intensive and financial systems. I started out on payment and bank lending systems, moved on to public-sector data integration, and spent over two years on site at <strong>ASML</strong>, working on .NET development and test automation for an e-Beam inspection system. Most recently, I built the ingestion pipeline behind a <strong>prediction-market data platform</strong> on AWS: 9 exchanges, production monitoring and alerting, and benchmark-driven performance work. When the product wound down, I carried out its shutdown too. I work <strong>AI-natively</strong>, designing the context and workflows (CLAUDE.md, SKILL.md) that let AI agents produce code I can trust. That cut new data-source integration from about two weeks to three days. Now I'm focused on <strong>Forward Deployed Engineer (FDE)</strong> roles and <strong>freelance work</strong>: starting where the problem is, sitting down with customers, pinning down what they actually need, building something that works, and staying with it until it runs reliably in the field. To me, software isn't done when it runs. It's done when it solves someone's problem.",
  },
  highlights: {
    title: "What's next, and what I've done",
    items: [
      {
        index: '01',
        status: 'active',
        label: 'OPEN TO WORK',
        icon: 'code',
        title: 'FDE × Freelance',
        body: 'Open to Forward Deployed Engineer (FDE) roles and freelance projects. From discovery and problem framing to building data pipelines and backend services and getting them live, I can own the whole path.',
        delay: '',
      },
      {
        index: '02',
        status: 'done',
        label: 'SHIPPED',
        icon: 'project',
        title: 'Prediction-Market Data Platform',
        body: 'Built the ingestion pipeline for a platform aggregating 9 prediction-market exchanges, sustaining 12.7M–17.9M price snapshots a day and cutting missing index-input fields from 33% to 10%, with 4.5M records filled through cross-source reconciliation. I profiled the archive pipeline and traced its bottleneck to the Google Drive API write limit; the fix cut transfer volume 17x, and each run after the initial archive covered only new data and finished in under 3 hours. At shutdown I decommissioned 16 services and archived 213 GB with zero data loss, then open-sourced a snapshot of the work with permission.',
        delay: 'delay-100',
        demo: {
          src: 'projects/pmi-platform.webp',
          alt: 'Walkthrough of the prediction-market platform: the index list, the war index history with its tooltip, the markets behind the score, and a backtest replay',
          width: 1600,
          height: 950,
        },
        links: [{ label: 'Source code', href: 'https://github.com/chen82508/pmi-platform' }],
      },
      {
        index: '03',
        status: 'done',
        label: 'DEPLOYED',
        icon: 'stack',
        title: 'ASML Experience',
        body: 'On site at ASML, I designed and maintained modular .NET components for an e-Beam inspection system with complex hardware integration. I built a Python and TestComplete automation framework that added 70+ test cases, raised code coverage from 11% to 32% and cut regression runs from over 1 hour to ~20 minutes, and wrote the UML design docs that aligned PMs, FAEs and QA on requirements.',
        delay: 'delay-200',
      },
    ],
  },
  experience: {
    title: 'Experience',
    projectLabel: 'Project: ',
    detailsLabel: 'Details',
    earlierLabel: 'Earlier roles',
    filterLabel: 'Filtered by ',
    clearLabel: 'Clear filter',
    stackLabel: 'Tech used',
    relatedLabel: 'Related projects: ',
    relatedSeparator: ', ',
    storiesLabel: 'Problem-solving stories: ',
    timeline: {
      label: 'Timeline overview',
      permanent: 'Full-time',
      contract: 'Contract',
      partTime: 'Part-time & freelance',
    },
    jobs: [
      {
        key: 'micah',
        period: 'Mar 2026 – Nov 2026',
        company: 'Micah Group',
        role: 'Senior Backend & Infrastructure Engineer',
        project: 'Prediction-market aggregate index platform',
        headline: { value: '2 wks → 3 days', label: 'Integration time per exchange' },
        points: [
          'Built and owned scrapers and API ingestion for 9 prediction-market exchanges, sustaining 12.7M–17.9M price snapshots a day. Cut missing index-input fields from 33% to 10% with multi-key rotation, background API backfill and reconciliation by external contract ID (4.5M records filled).',
          'Ran 16 ingestion sidecars and several worker queues on Docker Compose on AWS EC2, and managed PostgreSQL migrations with Alembic. Set up 5 CloudWatch alarms with Slack alerts at launch that caught 30+ resource incidents before they reached users.',
          "Profiled the archive pipeline, benchmarked gzip, zstd, xz and columnar formats, and traced the bottleneck to Google Drive's ~3 writes per second, counted per file rather than per byte. Gzip compression cut upload traffic 17x; after the initial bulk archive, each run archived only new data and finished in under 3 hours.",
          'Wrote 5 SKILL.md workflows that cut integration of each of the first 7 exchanges from ~2 weeks to 3 days. Executed the CEO-decided shutdown: 16 services decommissioned, 213 GB archived, zero data loss.',
        ],
      },
      {
        key: 'gocode',
        period: 'Dec 2025 – Mar 2026',
        company: 'GoCode Pte Ltd',
        role: 'Senior Backend Developer (Node.js, contract)',
        project: 'B2B/B2C interactive game platform',
        headline: { value: '3 platforms', label: 'Served by the game-engine layer' },
        points: [
          'Built NestJS REST services and a game-engine layer (game logic, state transitions, rule validation) serving 3 internal platforms: admin dashboard, real-time game computation, and wallet debit and refund.',
          'Added Redis caching and session state, implemented Kafka event-streaming interfaces for service decoupling (not yet deployed at handover), documented API contracts in Swagger (OpenAPI), and unit-tested with Jest.',
          'Took on tech-lead duties in a 6-person team: led a refactor onto 7 standardized module templates and reviewed 10–20 pull requests a month.',
        ],
      },
      {
        key: 'freelance-esg',
        period: 'Jul 2025 – Dec 2025',
        company: 'Freelance',
        role: 'Backend Developer (part-time)',
        project: 'ESG consulting platform',
        headline: { value: '−23%', label: 'Avg. processing time across 7 features' },
        points: [
          'Built FastAPI REST services behind 7 platform features (survey entry, scoring, ESG analysis, peer benchmarking, improvement Q&A, report generation, historical comparison), cutting their average processing time by 23% with all acceptance criteria met.',
          'Added Pydantic validation, centralized logging middleware, unified exception handling and auth. Designed PostgreSQL schemas and indexes on GCP Cloud SQL, set up an Alembic migration workflow adopted by 5 developers, and integrated BigQuery for million-row ESG datasets.',
          'Built WebSocket notifications on a message queue that fan out new articles to subscribers by category (many-to-many), an estimated few hundred a day.',
        ],
      },
      {
        key: 'zealogics',
        period: 'May 2023 – Jul 2025',
        company: 'Zealogics',
        role: 'Senior C# Developer',
        project: 'ASML e-Beam inspection system (on site at client)',
        headline: { value: '11% → 32%', label: 'Code coverage' },
        points: [
          'Designed and maintained modular .NET components for a high-precision e-Beam inspection system with complex hardware integration, unit-tested with NUnit.',
          'Built a Python and TestComplete automation framework with reusable simulation libraries: 70+ new automated test cases, machine configurations covered from ~10 to 30+, code coverage from 11% to 32%, and regression runs for stable features from over 1 hour to ~20 minutes.',
          'Wrote UML design documents that aligned PMs, FAEs and QA on feasibility and customer requirements (3 documented designs), and produced test validation reports for customer UAT.',
        ],
      },
      {
        key: 'ptmb',
        period: 'Feb 2022 – Apr 2023',
        company: 'PTMB Holding',
        role: 'Senior Software Engineer',
        project: 'Enterprise and financial platforms',
        headline: { value: '−50%', label: 'Loan review time' },
        points: [
          "Developed a collateral scorecard engine that automated credit-risk assessment for loan approvals; appraisers' weekly reports showed 27% higher assessment efficiency and 50% less review time.",
          'Built an HR and statistics SPA end to end (ASP.NET Core API, Vue.js front end), replacing ad-hoc Excel sheets with standardized .docx, .xlsx and .pdf reports. Tuned MSSQL queries from 0.9s to 0.55s and cut HR processing time from 1.5 weeks to 4 days.',
          'Built NestJS APIs with strict validation pipes for high-volume asset-valuation data sync, and implemented SSO across ArgoERP, a Vitals/KM system and a case-workflow system via cross-system Oracle views and unified permissions.',
        ],
      },
      {
        key: 'hamastar',
        period: 'Aug 2019 – Jan 2022',
        company: 'Hamastar Technology',
        role: 'Software Engineer',
        project: 'Public-sector and enterprise projects',
        headline: { value: '−53%', label: 'External API calls at traffic peaks' },
        points: [
          "Integrated PTX and ArcGIS APIs into Hualien's real-time bus-tracking portal and built its front end in ASP.NET Web Forms from Figma designs; scheduled caching cut peak-hour external API calls by 53%.",
          "Built ETL pipelines merging hundreds of thousands of records from multiple agencies for the Ministry of the Interior's shared platform, saving 3.5 hours of work a day.",
          "Led CPC Corporation's parallel SharePoint migration, reaching 100% data consistency through cross-platform mapping and validation. Built a multi-format export engine (XLSX, ODS, PDF) and decoupled its mobile-office APIs with the Factory pattern and DI, making exports 41% faster.",
        ],
      },
      {
        key: 'ipass',
        period: 'Oct 2018 – Aug 2019',
        company: 'iPASS Corporation',
        role: 'Software Engineer',
        project: 'Electronic payment systems',
        headline: { value: 'Tens of millions', label: 'Records in monthly settlement runs' },
        points: [
          'Integrated payment APIs with a bank and multiple merchants (duty-free, taxi, coffee and convenience chains) in the six months before launch, with design documents, load testing and reconciliation for 24/7 transactions.',
          'Proposed moving transaction record IDs from serial values to GUIDs for distributed growth, then co-executed it with the team lead after DBA review, with no records lost. Built monthly settlement stored procedures processing tens of millions of records.',
        ],
      },
      {
        key: 'azion',
        period: 'May 2017 – Oct 2018',
        company: 'Azion Corporation',
        role: 'Software Engineer',
        project: 'Banking solutions',
        headline: { value: '2 banks', label: 'Collateral, credit and lending systems' },
        points: [
          "Developed core modules of KGI Bank's collateral management system in ASP.NET Web Forms (C#), enforcing credit-assessment data accuracy with MSSQL validation rules.",
          "Maintained Bank of Taiwan's credit and lending systems (ASP.NET Web Forms with VB.NET, Oracle): ran data migrations and resolved client-reported incidents through root-cause analysis and patch delivery.",
        ],
      },
    ],
    education: {
      school: 'B.S. in Applied Mathematics, National Chung Hsing University',
      years: '2011 – 2016',
    },
    languages: [
      { name: 'Mandarin Chinese', level: 'Native' },
      { name: 'Taiwanese Hokkien', level: 'Native' },
      { name: 'English', level: 'Intermediate' },
      { name: 'Japanese', level: 'Basic' },
    ],
  },
  projects: {
    title: 'Selected Projects',
    intro:
      'Public-sector websites I helped build that are still live and look much as they did when I worked on them. The clips are recordings of the live sites from November 2026.',
    tryLabel: 'Try it: ',
    visitLabel: 'Visit site',
    stackLabel: 'Tech used',
    items: [
      {
        key: 'hualien-bus',
        job: 'hamastar',
        title: 'Hualien Real-Time Bus Tracking',
        client: 'Hualien County Government',
        body: "Integrated PTX and ArcGIS APIs into the county traffic portal's real-time bus tracking and built its front end in ASP.NET Web Forms from Figma designs. Scheduled caching cut peak-hour external API calls by 53%.",
        tryIt:
          '查公車 (Bus) → 公車動態 (Real-time bus) → 花蓮市區線 (city lines) → route 311, 311A or 301',
        media: {
          src: 'projects/hualien-bus.webp',
          alt: "Picking route 311 under Hualien's city lines on the traffic portal, which lists estimated arrival times for each stop and shows buses on a map",
          width: 1600,
          height: 1000,
        },
        href: 'https://110traffic.hl.gov.tw/',
        tech: ['C# / .NET', 'ASP.NET Web Forms', 'PTX API', 'ArcGIS API'],
      },
      {
        key: 'moi',
        job: 'hamastar',
        title: 'Ministry of the Interior Website',
        client: 'Ministry of the Interior',
        body: "Built ETL pipelines for the Ministry of the Interior's shared platform, merging hundreds of thousands of records from multiple agencies and saving 3.5 hours of work a day.",
        tryIt:
          'the 主題服務 (Services) menu and the tabs under 訊息快遞 (News) and 快捷服務 (Quick links) on the home page',
        media: {
          src: 'projects/moi.webp',
          alt: 'The Ministry of the Interior home page: opening the Services menu, switching the News and Quick links tabs, and scrolling through the sections',
          width: 1600,
          height: 1000,
        },
        href: 'https://www.moi.gov.tw/',
        tech: ['C# / .NET', 'ETL'],
      },
    ],
  },
  stories: {
    title: 'How I solve problems',
    intro:
      'Start where the problem is, then decide what to do. Here is how that played out in past work. Open a card for the context, diagnosis, options and outcome.',
    groups: {
      workflow: { title: 'Solution workflow', note: 'Methods I keep reusing across roles' },
      domain: { title: 'Domain know-how', note: 'Rules and constraints I learned on the job' },
    },
    readLabel: 'Read the full story',
    stepLabels: {
      context: 'Context',
      judgment: 'Diagnosis',
      options: 'Options weighed',
      result: 'Outcome',
    },
    jobsLabel: 'Related roles',
    items: [
      {
        key: 'measure-first',
        kind: 'workflow',
        title: 'Measure first: why the archive ran slow',
        short: 'Archive bottleneck',
        summary:
          'Uploads took far longer than planned. Measuring showed the limit was Drive write count, not file size.',
        metric: { value: '17×', label: 'less upload traffic' },
        jobs: ['micah'],
        steps: {
          context:
            'The prediction-market platform had to archive 720M–1.1B price snapshots to Google Drive. Rows were deleted from the database only after their file uploaded, so upload speed set how fast the database freed space.',
          judgment:
            'Slack notifications showed the gap between writing a file and finishing its upload was much longer than expected, and files were going up as uncompressed JSON. Rather than spend time exploring alone, I asked the CTO for quick guidance and started gzipping every file.',
          options:
            'I benchmarked gzip, zstd, xz and a columnar format on real archive files: file-level compression alone gave 17–38x. But Drive allows about 3 writes per second, so upload time depends on file count, not bytes. Compression saves traffic, not time. I chose gzip over zstd: it ships with the standard library, and the host was bound by disk I/O, so compression speed did not change total time. I also ruled out staging data in Redis, which would have competed for memory with a PostgreSQL instance already using swap.',
          result:
            'Cut upload traffic and Drive usage about 17x. The initial archive took 3–4 days; after that, each run archived only new data and finished in under 3 hours, alongside other services.',
        },
        figure: null,
      },
      {
        key: 'data-quality',
        kind: 'workflow',
        title: 'Closing the data-quality loop: 33% → 10% missing',
        short: 'Missing data',
        summary:
          'Define which fields matter, sort the gaps by cause, fix each cause, and accept what the source never provides.',
        metric: { value: '33% → 10%', label: 'missing index-input fields' },
        jobs: ['micah'],
        steps: {
          context:
            'The platform computed indexes from 9 prediction-market exchanges, but 33% of the required index inputs were missing. Those inputs are what investors watch: 24-hour volume, the current traded probability, and the yes and no probabilities of each contract in an index.',
          judgment:
            'Most gaps came from never comparing each API schema and field meaning early on. Volume was the clearest case: Kalshi reports only lifetime volume, Polymarket also reports 24-hour volume, and exchanges scraped with Playwright expose no volume at all.',
          options:
            'I fixed each cause on its own: multi-key rotation, background API calls to fill web-only sources, 24-hour volume derived from the snapshot table, and cross-source matching on external contract IDs. Derived volume filled the most. For Kalshi I rejected two designs: a history API call per market (it already polled 80k–140k markets every 60 seconds, so load would double) and a Redis checkpoint store (the backend deliberately uses only PostgreSQL). Instead, each poll cycle reads the lifetime volume from 24 hours earlier in one indexed query and takes the difference, writing NULL rather than 0 when no reference exists so index weights stay clean.',
          result:
            'Cut missing fields from 33% to 10% and filled 4.5M records through cross-source matching. The remaining 10% is data the sources never provide.',
        },
        figure: null,
      },
      {
        key: 'zero-downtime',
        kind: 'workflow',
        title: 'Migrating without downtime: sequence IDs to GUIDs',
        short: 'Zero-downtime migration',
        summary:
          'GUIDs were the easy part. The hard part was switching a 24/7 payment system without stopping it.',
        metric: { value: '0', label: 'records lost' },
        jobs: ['ipass', 'micah'],
        steps: {
          context:
            'The e-payment system ran around the clock and keyed transaction records on an auto-increment sequence. I proposed moving to GUIDs to support distributed growth.',
          judgment:
            'The real question was how to swap the ID without interrupting service. After my manager and the DBA reviewed the proposal, I carried it out with my team lead.',
          options:
            'We switched in five steps: add a nullable GUID column with a unique index → dual-write from the application → backfill history in background batches → move reads and external references to the GUID → convert the primary key and drop the old auto-increment column. I used the same thinking for the Micah shutdown: after each archive file uploaded, its MD5 and size had to match what Drive reported before the matching rows were deleted.',
          result:
            'Migrated to GUIDs with zero data loss. At the Micah shutdown, decommissioned 16 services and archived 213 GB, also with zero data loss.',
        },
        figure: null,
      },
      {
        key: 'skill-gates',
        kind: 'workflow',
        title: 'Writing quality gates as SKILL.md',
        short: 'SKILL.md quality gates',
        summary:
          'Turn every past incident into a process the AI must follow, so onboarding an exchange no longer means checking fields by hand.',
        metric: { value: '2 wks → 3 days', label: 'integration time per exchange' },
        jobs: ['micah'],
        steps: {
          context:
            'Each new exchange took about 2 weeks, mostly spent matching fields by hand: the prompts used to build the early scrapers never spelled out which fields the index needed.',
          judgment:
            'I wrote the integration rules as 5 SKILL.md workflows for Claude Code: documentation standards, refactor design, a quality gate, exchange onboarding, and async loop safety. Onboarding requires probing the upstream API before writing code, and every rule cites an incident where health checks stayed green while data went wrong, such as a query that silently returned only 20 rows, or paging on a non-unique field that dropped 500–800 contracts per sweep.',
          options:
            'AI output had to pass the quality gate: ruff and strict mypy on the changed files only, done only when it printed PASSED, then the full pytest suite. New exchanges also needed tests that mimic real upstream behavior (default row caps, 429 and 5xx responses, malformed payloads), new features shipped off by default with tests for the off state, and new SQL on hot tables had its query plan checked against about 8M synthetic rows.',
          result:
            'Cut integration time for each of the first 7 exchanges from ~2 weeks to 3 days, reaching 9 exchanges in all.',
        },
        figure: null,
      },
      {
        key: 'reconciliation',
        kind: 'domain',
        title: 'E-payments: a wrong settlement report is a security incident',
        short: 'Payment reconciliation',
        summary:
          'After two reconciliation incidents, I built the fixes into the code structure and release process so the same mistakes could not recur.',
        metric: null,
        jobs: ['ipass'],
        steps: {
          context:
            'The e-payment system settled tens of millions of transactions a month and sent reconciliation reports to the banks and merchants that requested them.',
          judgment:
            "Two incidents were classed as security issues. First, a .NET DataSet used as a buffer was not cleared before querying and reporting the next merchant. Second, when LINE Pay moved settlement from monthly to weekly, our test cases missed scenarios and our totals did not match LINE Pay's.",
          options:
            'For the first, I moved "clear the buffer before each merchant query" into a base class with the Factory pattern and required related features to implement a matching interface, so one merchant\'s records could never reach another\'s report. For the second, I reviewed the stored procedure line by line with my mentor, added broader weekly-settlement cases including destructive tests, and checked each against expected results. We filed the deployment only after every item on the checklist passed.',
          result:
            'Clearing the buffer became a fixed step in the base class, and weekly settlement shipped only after passing the expanded test checklist.',
        },
        figure: null,
      },
      {
        key: 'scorecard',
        kind: 'domain',
        title: 'Collateral scorecards: let appraisers own the formula',
        short: 'Collateral scorecard',
        summary:
          'Scoring rules change with appraisal practice, so I kept them out of the code and handed them to the people who know them best.',
        metric: { value: '−50%', label: 'review time' },
        jobs: ['ptmb'],
        steps: {
          context:
            'I built a collateral scorecard engine to automate credit-risk assessment for loan approvals.',
          judgment:
            'Scoring rules change with appraisal practice, so instead of hard-coding them I built formula setup and maintenance into the back office: addition with positive and negative coefficients, plus multiplication and division, so appraisers could weight each factor and set its bonuses and penalties themselves.',
          options:
            'After saving a formula, appraisers could run a trial calculation to confirm the factors, coefficients and operators were right. Once the feature shipped, I ran training sessions on how to use it.',
          result:
            "Per the appraisers' weekly reports, assessment efficiency rose 27% and review time fell 50%.",
        },
        figure: null,
      },
      {
        key: 'defect-colormap',
        kind: 'domain',
        title: 'Semiconductor inspection: colorizing grayscale defect images',
        short: 'Defect image colorization',
        summary:
          "On ASML's e-Beam inspection system, a component that shows each image's gray-level distribution and lets users define their own color scale.",
        metric: null,
        jobs: ['zealogics'],
        steps: {
          context: "Defect images from ASML's e-Beam inspection system are 0–255 grayscale.",
          judgment:
            "I split the work with a colleague: I built the user interface and its features, and they built the service that reads the color settings and maps them to each pixel. The UI used the system's existing WinForms with the open-source OxyPlot library.",
          options:
            'A histogram shows how many pixels the current image has at each gray level from 0 to 255, with a default jet color scale below it. Users can apply it as is, or click points on the x-axis to define their own scale, and the color mapping below updates right away. OxyPlot was hard to extend, and I worked out a fix for each limit.',
          result:
            "The client did not share quantitative results on defect review. On the same assignment, I built test automation from the SQA team's manual test cases, raising code coverage from 11% to 32% and cutting regression runs from over 1 hour to ~20 minutes.",
        },
        figure: {
          width: 640,
          height: 400,
          images: [
            {
              src: 'stories/defect-gray.webp',
              label: 'Original grayscale (0–255)',
              alt: 'Simulated e-Beam grayscale image: evenly spaced dark lines with a dark bridging defect between two of them, above a 0–255 gray ramp',
            },
            {
              src: 'stories/defect-jet.webp',
              label: 'With the jet color scale',
              alt: 'The same image with the jet color scale: blue lines on a yellow-green background, the defect deep blue with a red halo, above the matching jet color bar',
            },
          ],
          note: 'Illustration only: a simulated image generated in code, not real ASML inspection data.',
        },
      },
    ],
  },
  skills: {
    title: 'Tech Stack',
    intro:
      'Years and role counts come from my work history, with overlapping periods counted once. Pick a technology to see where I used it.',
    tiers: {
      core: { title: 'Core stack', note: 'What I build with day to day.' },
      shipped: { title: 'Shipped with', note: 'Used in production projects.' },
      other: { title: 'Also use', note: 'Everyday tooling and AI-native development.' },
    },
    units: {
      year: { one: 'yr', other: 'yrs' },
      month: { one: 'mo', other: 'mo' },
      role: { one: 'role', other: 'roles' },
    },
    usedIn: 'Used in',
  },
  contact: {
    title: "Have something to ship or a role to fill? Let's talk.",
    body: "Whether it's an FDE role, a freelance project, or just a chat about engineering, I'd like to hear from you.",
    primary: 'Get in touch',
    secondary: 'See my work',
    location: '// Kaohsiung, Taiwan / Remote · open to travel and overseas remote work',
  },
};
