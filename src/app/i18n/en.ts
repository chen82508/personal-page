import { SiteContent } from './types';

// Copy adapted from docs/reference/resume_en.pdf. Third-party client names stay
// anonymised to match the Chinese page until disclosure is confirmed (see docs/TODO.md).
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
  hero: {
    status: 'Open to FDE roles & freelance work',
    headline: [['Start where the problem is.'], ['Ship software that holds up in production.']],
    tagline: 'Backend & infrastructure engineer, 9+ years in data-intensive and financial systems.',
    comment: '// open to FDE roles & freelance projects',
  },
  about: {
    title: 'About Me',
    html: "I'm <strong>Kaito</strong>, a <strong>senior backend &amp; infrastructure engineer</strong> with <strong>9+ years</strong> of experience building data-intensive and financial systems. I started out on payment and bank lending systems, moved on to public-sector data integration, and spent over two years on site at <strong>ASML</strong>, working on .NET development and test automation for an e-Beam inspection system. Most recently, I built the ingestion pipeline behind a <strong>prediction-market data platform</strong> on AWS: 9 exchanges, production monitoring and alerting, and benchmark-driven performance work. When the product wound down, I led its shutdown too. I work <strong>AI-natively</strong>, designing the context and workflows (CLAUDE.md, SKILL.md) that let AI agents produce code I can trust. That cut new data-source integration from about two weeks to three days. Now I'm focused on <strong>Forward Deployed Engineer (FDE)</strong> roles and <strong>freelance work</strong>: sitting down with customers, pinning down what they actually need, building something that works, and staying with it until it runs reliably in the field. To me, software isn't done when it runs. It's done when it solves someone's problem.",
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
        body: 'Built the ingestion pipeline for a platform aggregating 9 prediction-market exchanges, sustaining 12.7–17.9M price snapshots a day, lifting data completeness by 23% and filling 4.5M data gaps. I led the archive-pipeline performance investigation; my proposal was projected to cut uploads from 3–4 days to under 2 hours. At sunset I archived 213 GB and retired 16 services with zero data loss, then open-sourced a snapshot of the work with permission.',
        delay: 'delay-100',
        links: [
          { label: 'Live demo', href: 'https://chen82508.github.io/pmi-platform/' },
          { label: 'Source code', href: 'https://github.com/chen82508/pmi-platform' },
        ],
      },
      {
        index: '03',
        status: 'done',
        label: 'DEPLOYED',
        icon: 'stack',
        title: 'ASML Experience',
        body: 'On site at ASML, I worked on the modular .NET architecture of an e-Beam inspection system and led core modules through the move from .NET Framework to .NET Core. I built a Python and TestComplete automation framework that raised test coverage from 11% to 32% across machine configurations, and wrote the UML design docs that got PMs, FAEs and QA aligned on requirements.',
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
        headline: { value: '2 wks → 3 days', label: 'New-exchange integration time' },
        points: [
          'Built ingestion for 9 prediction-market exchanges across web and API sources, sustaining 12.7–17.9M price snapshots a day. Multi-key rotation and background API backfills lifted data completeness by 23%.',
          'Ran the platform on Docker Compose with 16 ingest sidecars and several worker queue lanes, managed PostgreSQL migrations with Alembic, and set up CloudWatch monitoring with Slack alerts at launch.',
          'Wrote 5 SKILL.md workflows that cut new-exchange integration from ~2 weeks to 3 days, then led the product sunset: 213 GB archived, 16 services retired, zero data loss.',
        ],
      },
      {
        key: 'gocode',
        period: 'Dec 2025 – Mar 2026',
        company: 'GoCode Pte Ltd',
        role: 'Senior Backend Developer (Node.js, contract)',
        project: 'B2B/B2C interactive game platform',
        headline: { value: '+26%', label: 'Performance of high-throughput services' },
        points: [
          'Built NestJS REST services for platform integrations and designed a game-engine layer for gameplay logic, state transitions and rule validation, supporting 3 integrations.',
          'Used Redis for caching and session state and Kafka for async event streaming, decoupling high-throughput services and improving performance by 26%.',
          'Led a refactor around standard module templates and architecture guidelines, and ran regular code reviews for the team.',
        ],
      },
      {
        key: 'freelance-esg',
        period: 'Jul 2025 – Dec 2025',
        company: 'Freelance',
        role: 'Backend Developer (part-time)',
        project: 'ESG consulting platform',
        headline: { value: '+23%', label: 'Across 7 key service metrics' },
        points: [
          'Built FastAPI services with Pydantic validation, centralized logging, unified error handling and secure auth, improving 7 key service metrics by 23%.',
          'Processed millions of ESG records with GCP BigQuery, improving processing efficiency by 17%, and designed PostgreSQL schemas and indexes on Cloud SQL that cut dashboard queries from 1.1s to 0.7s, with an Alembic workflow adopted by 5 developers.',
        ],
      },
      {
        key: 'zealogics',
        period: 'May 2023 – Sep 2025',
        company: 'Zealogics Taiwan',
        role: 'Senior C# Developer',
        project: 'ASML e-Beam inspection system (on site at client)',
        headline: { value: '11% → 32%', label: 'Test coverage across machine configurations' },
        points: [
          'Designed and maintained the modular .NET architecture of a high-precision e-Beam inspection system, and led core modules through the migration from .NET Framework to .NET Core.',
          'Built a Python and TestComplete automation framework with a reusable simulation library, raising test coverage from 11% to 32% across machine configurations.',
          "Delivered 3 UML design documents that aligned PMs, FAEs and QA on feasibility and requirements; test validation reports shortened the client's UAT cycle.",
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
          'Built a collateral scorecard engine that automated credit-risk assessment for loan approvals, making assessments 27% more efficient and halving review time.',
          'Built an HR and statistics SPA (ASP.NET Core, Vue.js) with MSSQL tuning and automated reports, cutting processing time from 1.5 weeks to 4 days.',
          'Implemented SSO between ESP and ERP platforms through cross-system Oracle views and unified permissions, covering 3 integrated systems.',
        ],
      },
      {
        key: 'hamastar',
        period: 'Aug 2019 – Jan 2022',
        company: 'Hamastar',
        role: 'Software Engineer',
        project: 'Public-sector and enterprise projects',
        headline: { value: '−53%', label: 'External API calls at traffic peaks' },
        points: [
          "Integrated PTX and ArcGIS APIs into Hualien's real-time bus tracking portal, with scheduled caching that cut external API calls by 53% during traffic peaks.",
          'Led a parallel SharePoint migration for a state-owned enterprise, reaching 100% data consistency through cross-platform mapping and validation.',
          'Built ETL pipelines consolidating datasets from multiple agencies for a government data platform, and rebuilt a multi-format export engine with the Factory pattern and DI for 41% faster exports.',
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
          'Integrated secure payment APIs with multiple banks and merchants, owning design docs, load testing and reconciliation for 24/7 transaction stability at 99.9% availability.',
          'Led the move of transaction IDs from serial values to GUIDs for distributed growth, and built monthly settlement procedures handling tens of millions of records.',
        ],
      },
      {
        key: 'azion',
        period: 'May 2017 – Oct 2018',
        company: 'Azion Corporation',
        role: 'Software Engineer',
        project: 'Banking solutions',
        headline: { value: '+13%', label: 'Credit and lending system reliability' },
        points: [
          "Developed core modules of a bank's collateral management system, with MSSQL validation rules that kept credit-appraisal data accurate.",
          "Maintained a bank's credit and lending system through Oracle data migrations and daily root-cause analysis, improving reliability by 13%.",
        ],
      },
    ],
    education: {
      school: 'B.S. in Applied Mathematics, National Chung Hsing University',
      years: '2011 – 2016',
    },
    languages: [
      { name: 'Chinese', level: 'Native' },
      { name: 'English', level: 'Intermediate' },
      { name: 'Japanese', level: 'Intermediate' },
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
