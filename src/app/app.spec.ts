import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Lang, SITE_LANG, detectLang } from './i18n/types';

async function render(lang: Lang = 'zh') {
  await TestBed.configureTestingModule({
    imports: [App],
    providers: [{ provide: SITE_LANG, useValue: lang }],
  }).compileComponents();
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
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

  it('should render PrimeNG components for highlights, skills and CTA', async () => {
    const compiled = await render();
    expect(compiled.querySelectorAll('#highlights p-card').length).toBe(3);
    expect(compiled.querySelectorAll('#skills p-card').length).toBe(6);
    expect(compiled.querySelectorAll('p-tag').length).toBe(3);
    expect(compiled.querySelectorAll('.p-button').length).toBe(2);
  });

  it('should render the experience timeline and contact links', async () => {
    const compiled = await render();
    expect(compiled.querySelectorAll('#experience ol > li').length).toBe(8);
    const hrefs = Array.from(compiled.querySelectorAll('#contact ul a')).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual([
      'mailto:chen82508@gmail.com',
      'https://github.com/chen82508',
      'https://www.linkedin.com/in/kaitochen-15800326ta/',
    ]);
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
    expect(compiled.querySelectorAll('#experience ol > li').length).toBe(8);
    expect(compiled.querySelectorAll('#skills p-card').length).toBe(6);
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
