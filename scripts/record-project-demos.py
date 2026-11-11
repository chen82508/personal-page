"""錄製「專案作品集」的示範 GIF（Playwright 逐格截圖 + Pillow 合成）。

用法（在 repo 根目錄執行，使用本機的 Google Chrome，不需另外下載瀏覽器）：

    python3 -m venv /tmp/rec-venv && /tmp/rec-venv/bin/pip install playwright pillow
    /tmp/rec-venv/bin/python scripts/record-project-demos.py hualien public/projects/hualien-bus.gif
    /tmp/rec-venv/bin/python scripts/record-project-demos.py moi public/projects/moi.gif

錄完後從 GIF 挑一格存成同名 .webp，作為減少動畫偏好時的靜態圖。
滾動頁面用 scrollBy 而不是滑鼠滾輪，因為滑鼠停在地圖上時，滾輪會縮放地圖。
"""
import io
import sys

from PIL import Image
from playwright.sync_api import sync_playwright

W, H = 1280, 800
OUT_W = 800

CURSOR_JS = """
(() => {
  const add = () => {
    if (document.getElementById('__cur')) return;
    const c = document.createElement('div');
    c.id = '__cur';
    c.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;' +
      'border-radius:50%;background:rgba(223,160,110,.55);border:2px solid #fff;' +
      'box-shadow:0 0 0 1px rgba(0,0,0,.35);z-index:2147483647;pointer-events:none;' +
      'transition:transform .12s;';
    document.documentElement.appendChild(c);
    addEventListener('mousemove', e => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, true);
    addEventListener('mousedown', () => c.style.transform = 'scale(.6)', true);
    addEventListener('mouseup', () => c.style.transform = '', true);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
})();
"""


class Rec:
    def __init__(self, page):
        self.page = page
        self.frames = []  # (image, ms)
        self.pos = (W / 2, H / 2)

    def snap(self, ms=150):
        png = self.page.screenshot(type="png")
        im = Image.open(io.BytesIO(png)).convert("RGB")
        im = im.resize((OUT_W, int(OUT_W * H / W)), Image.LANCZOS)
        self.frames.append((im, ms))

    def hold(self, ms):
        self.snap(ms)

    def move(self, x, y, steps=8):
        x0, y0 = self.pos
        for i in range(1, steps + 1):
            t = i / steps
            t = t * t * (3 - 2 * t)
            self.page.mouse.move(x0 + (x - x0) * t, y0 + (y - y0) * t)
            if i % 2 == 0 or i == steps:
                self.snap(70)
        self.pos = (x, y)

    def move_to(self, locator, steps=8):
        locator.scroll_into_view_if_needed()
        box = locator.bounding_box()
        self.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2, steps)

    def click(self):
        self.page.mouse.down()
        self.snap(90)
        self.page.mouse.up()

    def scroll(self, dy, steps=10):
        # 用 scrollBy 而不是滾輪：滑鼠停在地圖上時，滾輪會縮放地圖
        for _ in range(steps):
            self.page.evaluate(f"window.scrollBy({{top: {dy / steps}, behavior: 'instant'}})")
            self.page.wait_for_timeout(60)
            self.snap(80)

    def save(self, path, colors=128):
        imgs, durs = [], []
        for im, ms in self.frames:
            imgs.append(im.quantize(colors=colors, method=Image.MEDIANCUT, dither=Image.NONE))
            durs.append(ms)
        imgs[0].save(path, save_all=True, append_images=imgs[1:], duration=durs, loop=0,
                     optimize=True, disposal=1)


def hualien(rec):
    pg = rec.page
    pg.goto("https://110traffic.hl.gov.tw/Bus/BusChoice", wait_until="networkidle", timeout=60000)
    pg.evaluate("window.scrollTo(0, 420)")
    pg.wait_for_timeout(600)
    rec.hold(900)
    rec.move_to(pg.get_by_text("花蓮市區線", exact=True).locator("visible=true").first)
    rec.click()
    pg.wait_for_timeout(1000)
    rec.hold(700)
    rec.move_to(pg.get_by_text("311", exact=True).locator("visible=true").first)
    rec.click()
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(3500)
    rec.snap(400)
    # 讓站牌列表與地圖同時入鏡
    top = pg.locator("text=點選下列站牌").first.evaluate("e => e.getBoundingClientRect().top")
    rec.scroll(top - 90, steps=8)
    pg.wait_for_timeout(1500)
    rec.hold(1500)
    # 點選一個站牌，顯示該站的預估到站時間
    stops = pg.locator("text=臺灣企銀").locator("visible=true")
    if stops.count():
        rec.move_to(stops.first)
        rec.click()
        pg.wait_for_timeout(2000)
        rec.hold(2200)
    # 捲動站牌列表
    lst = pg.locator("text=花蓮商校").locator("visible=true").first
    box = lst.bounding_box()
    rec.move(box["x"] + 60, box["y"] + 60)
    for _ in range(3):
        pg.mouse.wheel(0, 140)
        pg.wait_for_timeout(250)
        rec.snap(250)
    rec.hold(1800)


def moi(rec):
    pg = rec.page
    pg.goto("https://www.moi.gov.tw/", wait_until="load", timeout=90000)
    pg.wait_for_timeout(3000)
    print("moi loaded", flush=True)
    rec.hold(1200)
    menu = pg.get_by_text("主題服務", exact=True).locator("visible=true").first
    rec.move_to(menu)
    pg.wait_for_timeout(900)
    rec.hold(1400)
    rec.move(640, 560)
    pg.wait_for_timeout(500)
    rec.scroll(700, steps=5)
    rec.hold(700)
    tab = pg.get_by_text("即時新聞澄清", exact=True).locator("visible=true").first
    rec.move_to(tab)
    rec.click()
    pg.wait_for_timeout(1200)
    rec.hold(1300)
    rec.scroll(1900, steps=8)
    tab = pg.get_by_text("土地", exact=True).locator("visible=true").first
    if tab.count():
        rec.move_to(tab)
        rec.click()
        pg.wait_for_timeout(1200)
        rec.hold(1400)
    rec.scroll(1300, steps=6)
    rec.hold(1500)


def main():
    which, out = sys.argv[1], sys.argv[2]
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chrome")
        ctx = b.new_context(viewport={"width": W, "height": H}, locale="zh-TW", device_scale_factor=1)
        ctx.add_init_script(CURSOR_JS)
        page = ctx.new_page()
        page.set_default_timeout(15000)
        rec = Rec(page)
        {"hualien": hualien, "moi": moi}[which](rec)
        rec.save(out, colors=96 if which == "moi" else 128)
        print(which, len(rec.frames), "frames", sum(ms for _, ms in rec.frames) / 1000, "s")
        b.close()


if __name__ == "__main__":
    main()
