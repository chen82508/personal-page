import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Lang, SITE_LANG, detectLang } from './i18n/types';

async function setup(lang: Lang = 'zh') {
  await TestBed.configureTestingModule({
    imports: [App],
    providers: [{ provide: SITE_LANG, useValue: lang }],
  }).compileComponents();
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  return fixture;
}

async function render(lang: Lang = 'zh') {
  return (await setup(lang)).nativeElement as HTMLElement;
}

describe('App', () => {
  it('should create the app', async () => {
    await render();
    expect(TestBed.createComponent(App).componentInstance).toBeTruthy();
  });

  it('should render the hero headline and three highlights', async () => {
    const compiled = await render();
    expect(compiled.querySelector('h1')?.textContent).toContain('把需求做成能上線的軟體');
    expect(compiled.querySelectorAll('#highlights app-highlight-card').length).toBe(3);
  });

  it('should point 查看作品 at the highlights section', async () => {
    const compiled = await render();
    const cta = Array.from(compiled.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('查看作品'),
    );
    expect(cta?.getAttribute('href')).toBe('#highlights');
    expect(compiled.querySelector('section#highlights')).toBeTruthy();
  });

  it('should link only the prediction-market card to its live demo and repository', async () => {
    const compiled = await render();
    const cards = compiled.querySelectorAll('app-highlight-card');
    const links = Array.from(cards[1].querySelectorAll<HTMLAnchorElement>('a'));
    expect(compiled.querySelectorAll('app-highlight-card a').length).toBe(2);
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://chen82508.github.io/pmi-platform/',
      'https://github.com/chen82508/pmi-platform',
    ]);
    expect(links.every((a) => a.getAttribute('rel') === 'noopener')).toBe(true);
  });

  it('should render the project cards with a demo button and external links', async () => {
    const compiled = await render();
    expect(compiled.querySelectorAll('#projects app-project-card').length).toBe(2);
    const visit = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('#projects a[target]'));
    expect(visit.map((a) => a.getAttribute('href'))).toEqual([
      'https://110traffic.hl.gov.tw/',
      'https://www.moi.gov.tw/',
    ]);
    expect(visit.every((a) => a.getAttribute('rel') === 'noopener')).toBe(true);
    // GIF 只在按下按鈕、對話框開啟後才載入
    expect(compiled.querySelectorAll('#projects img').length).toBe(0);
    expect(compiled.querySelectorAll('#projects button[aria-haspopup="dialog"]').length).toBe(2);
  });

  it('should open the demo dialog with the GIF when the button is pressed', async () => {
    const fixture = await setup();
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector<HTMLButtonElement>('#projects button[aria-haspopup="dialog"]')!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const img = document.querySelector<HTMLImageElement>('.p-dialog img');
    expect(img?.getAttribute('src')).toBe('projects/hualien-bus.gif');
    expect(img?.getAttribute('alt')).toBeTruthy();
  });

  it('should cross-link projects and the related job', async () => {
    const compiled = await render();
    const jobLinks = Array.from(compiled.querySelectorAll('#projects a:not([target])')).map((a) =>
      a.getAttribute('href'),
    );
    expect(jobLinks).toEqual(['#job-hamastar', '#job-hamastar']);
    const related = Array.from(compiled.querySelectorAll('#job-hamastar a[href^="#project-"]'));
    expect(related.map((a) => a.getAttribute('href'))).toEqual([
      '#project-hualien-bus',
      '#project-moi',
    ]);
    for (const key of ['hualien-bus', 'moi']) {
      expect(compiled.querySelector(`#project-${key}`)).toBeTruthy();
    }
  });

  it('should render PrimeNG components for highlights and CTA', async () => {
    const compiled = await render();
    expect(compiled.querySelectorAll('#highlights p-card').length).toBe(3);
    expect(compiled.querySelectorAll('p-tag').length).toBe(3);
    expect(compiled.querySelectorAll('#contact .p-button').length).toBe(2);
    expect(compiled.querySelectorAll('#projects .p-button').length).toBe(2);
  });

  it('should render the experience timeline and contact links', async () => {
    const compiled = await render();
    expect(compiled.querySelectorAll('#experience li[id^="job-"]').length).toBe(8);
    expect(compiled.querySelectorAll('#experience details[open] li[id^="job-"]').length).toBe(0);
    const hrefs = Array.from(compiled.querySelectorAll('#contact ul a')).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual([
      'mailto:chen82508@gmail.com',
      'https://github.com/chen82508',
      'https://www.linkedin.com/in/kaitochen-15800326ta/',
    ]);
    // 每個連結都有圖示，標籤以螢幕閱讀器文字保留
    const links = compiled.querySelectorAll('#contact ul a');
    expect(Array.from(links).every((a) => a.querySelector('app-contact-icon svg'))).toBe(true);
    expect(Array.from(links).map((a) => a.querySelector('.sr-only')?.textContent)).toEqual([
      'Email',
      'GitHub',
      'LinkedIn',
    ]);
  });

  it('should draw overlapping roles on a second timeline lane', async () => {
    const compiled = await render();
    const bars = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('#experience figure a'));
    expect(bars.length).toBe(8);
    // 與前一段同時進行的經歷在第二軌；樣式依任職類型：兼職／業外虛線、約聘斜紋
    const secondLane = bars.filter((a) => a.classList.contains('top-[30px]'));
    expect(secondLane.map((a) => a.getAttribute('href'))).toEqual([
      '#job-freelance-esg',
      '#job-micah',
    ]);
    const dashed = bars.filter((a) => a.querySelector('.border-dashed'));
    expect(dashed.map((a) => a.getAttribute('href'))).toEqual(['#job-freelance-esg']);
    const hatched = bars.filter((a) => a.querySelector('.bg-hatch'));
    expect(hatched.map((a) => a.getAttribute('href'))).toEqual(['#job-gocode']);
    expect(compiled.querySelector('#experience figcaption')?.textContent).toMatch(
      /正職.*約聘.*兼職／業外/s,
    );
    // 由舊到新排列：第一條是最早的經歷，從左邊緣開始
    expect(bars[0].getAttribute('href')).toBe('#job-azion');
    expect(bars[0].style.left).toBe('0%');

    // 交接月（例如驊宏資通 → iPASS 的 2018.10）從中間切開：同一軌的長條不重疊
    const mainLane = bars
      .filter((a) => !a.classList.contains('top-[30px]'))
      .map((a) => [parseFloat(a.style.left), parseFloat(a.style.left) + parseFloat(a.style.width)]);
    mainLane
      .slice(1)
      .forEach(([left], i) => expect(left).toBeGreaterThanOrEqual(mainLane[i][1] - 1e-9));
  });

  it('should filter experience by a technology picked in the tech stack', async () => {
    const fixture = await setup();
    const compiled = fixture.nativeElement as HTMLElement;
    const tierButtons = compiled.querySelectorAll<HTMLButtonElement>('#skills [data-tier] button');
    const etl = Array.from(tierButtons).find((b) => b.textContent?.includes('ETL'));
    etl?.click();
    await fixture.whenStable();

    // ETL 只用在哈瑪星：其他經歷淡化，收合的「更早的經歷」自動展開
    const rows = Array.from(compiled.querySelectorAll('#experience li[id^="job-"]'));
    const visible = rows.filter(
      (li) => !li.querySelector('article')?.classList.contains('opacity-35'),
    );
    expect(visible.map((li) => li.id)).toEqual(['job-hamastar']);
    expect(compiled.querySelector('#experience details[open]')).toBeTruthy();
    expect(etl?.getAttribute('aria-pressed')).toBe('true');
    const links = compiled.querySelectorAll('#skills [data-tier] a[href*="#job-"]');
    expect(Array.from(links).map((a) => a.getAttribute('href'))).toEqual(['#job-hamastar']);

    // 再點一次取消篩選
    etl?.click();
    await fixture.whenStable();
    expect(compiled.querySelectorAll('#experience article.opacity-35').length).toBe(0);
  });

  it('should show only tiered stack items that have evidence as filter buttons', async () => {
    const compiled = await render();
    const other = compiled.querySelector('#skills [data-tier="other"]');
    expect(other?.querySelectorAll('button').length).toBe(0);
    const core = compiled.querySelector('#skills [data-tier="core"] button');
    expect(core?.textContent).toMatch(/年 · \d 段經歷/);
  });

  it('should link the Chinese page to the English page', async () => {
    const compiled = await render();
    const link = compiled.querySelector<HTMLAnchorElement>('nav[aria-label="Language"] a');
    expect(link?.getAttribute('href')).toBe('en/');
    expect(document.documentElement.lang).toBe('zh-Hant');
  });

  it('should render the English page with the same structure', async () => {
    const compiled = await render('en');
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Ship software that holds up in production.',
    );
    expect(compiled.querySelectorAll('#highlights app-highlight-card').length).toBe(3);
    expect(compiled.querySelectorAll('#experience li[id^="job-"]').length).toBe(8);
    expect(compiled.querySelectorAll('#skills [data-tier]').length).toBe(3);
    const cta = Array.from(compiled.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('See my work'),
    );
    expect(cta?.getAttribute('href')).toBe('en/#highlights');
    const link = compiled.querySelector<HTMLAnchorElement>('nav[aria-label="Language"] a');
    expect(link?.getAttribute('href')).toBe('./');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Kaito Chen');
  });
});

describe('detectLang', () => {
  const doc = (base: string, path: string) =>
    ({
      baseURI: `https://chen82508.github.io${base}`,
      location: { pathname: path },
    }) as unknown as Document;

  it('should read the language from the path after the base href', () => {
    expect(detectLang(doc('/personal-page/', '/personal-page/'))).toBe('zh');
    expect(detectLang(doc('/personal-page/', '/personal-page/en/'))).toBe('en');
    expect(detectLang(doc('/personal-page/', '/personal-page/en'))).toBe('en');
    expect(detectLang(doc('/', '/en/'))).toBe('en');
    expect(detectLang(doc('/', '/engineering'))).toBe('zh');
  });
});
