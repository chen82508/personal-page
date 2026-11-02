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

  it('should show the toast when 查看作品 is clicked', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p-toast')?.textContent).not.toContain('作品集正在準備中');
    compiled.querySelector<HTMLButtonElement>('button[type="button"]')?.click();
    await fixture.whenStable();
    expect(compiled.querySelector('p-toast')?.textContent).toContain('作品集正在準備中');
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
