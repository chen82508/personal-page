import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero headline and three highlights', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('把需求做成能上線的軟體');
    expect(compiled.querySelectorAll('.grid > .reveal').length).toBe(3);
  });

  it('should point 查看作品 at the highlights section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = Array.from(compiled.querySelectorAll('a')).find((a) => a.textContent?.includes('查看作品'));
    expect(cta?.getAttribute('href')).toBe('#highlights');
    expect(compiled.querySelector('section#highlights')).toBeTruthy();
  });

  it('should link only the prediction-market card to its live demo and repository', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-highlight-card');
    const links = Array.from(cards[1].querySelectorAll<HTMLAnchorElement>('a'));
    expect(compiled.querySelectorAll('app-highlight-card a').length).toBe(2);
    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      'https://chen82508.github.io/pmi-platform/',
      'https://github.com/chen82508/pmi-platform',
    ]);
    expect(links.every((a) => a.getAttribute('rel') === 'noopener')).toBe(true);
  });

  it('should render PrimeNG components for highlights and CTA', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('p-card').length).toBe(3);
    expect(compiled.querySelectorAll('p-tag').length).toBe(3);
    expect(compiled.querySelectorAll('.p-button').length).toBe(2);
  });
});
