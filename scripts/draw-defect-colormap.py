"""產生「灰階缺陷影像彩色化」故事的前、後對照圖（public/stories/）。

不使用實際的檢測影像（屬於客戶資料），而是畫一張模擬的 e-Beam 影像：
直線圖形之間有一處橋接缺陷，加上雜訊與模糊；再以 jet 色階把 0–255 的灰階上色。

用法（在 repo 根目錄執行）：

    python3 -m venv /tmp/fig-venv && /tmp/fig-venv/bin/pip install numpy pillow
    /tmp/fig-venv/bin/python scripts/draw-defect-colormap.py public/stories

輸出 defect-gray.webp 與 defect-jet.webp（各 640×400，對話框中約以 320 px 寬顯示，Retina 上不模糊），
每張下方附一條色階：灰階圖是 0→255 的漸層，jet 圖是對應的 jet 色帶。
"""

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

W, H = 640, 360  # 影像本體
BAR_GAP, BAR_H = 16, 24  # 下方色階條
SEED = 7


def sem_image() -> np.ndarray:
    """模擬的 e-Beam 影像（0–255）：中灰背景、線緣偏亮的暗色直線、一處橋接缺陷與周圍的亮暈。"""
    rng = np.random.default_rng(SEED)
    bg = 138.0
    img = np.full((H, W), bg)
    x = np.arange(W)
    y = np.arange(H)[:, None]

    # 等距的暗色直線，邊緣有些微起伏；e-Beam 影像的線緣會偏亮
    pitch, width = 92, 30
    for cx in range(46, W, pitch):
        wobble = 1.2 * np.sin(y / 31 + cx)
        dist = np.abs(x[None, :] - (cx + wobble))
        img -= 95 * np.clip((width / 2 - dist) / 3 + 0.5, 0, 1)
        img += 45 * np.exp(-(((dist - width / 2) / 3.2) ** 2))

    # 線段中間斷開，像截圖中上下兩段的末端
    gap_x, gap_top, gap_bot = 46 + pitch * 3, 140, 210
    yy, xx = np.mgrid[0:H, 0:W]
    in_gap = (np.abs(xx - gap_x) < 22) & (yy > gap_top) & (yy < gap_bot)
    img[in_gap] = bg

    # 橋接缺陷：相鄰兩條線之間一塊不規則的暗斑，中心最暗
    cx, cy = gap_x - pitch / 2, 176
    r = np.hypot((xx - cx) / 40, (yy - cy) / 26)
    img -= 125 * np.clip(1.15 - r, 0, 1) ** 0.6
    # 缺陷周圍的亮暈
    img += 85 * np.exp(-(((xx - cx) / 62) ** 2 + ((yy - cy) / 40) ** 2)) * (r > 1)

    img += rng.normal(0, 16, img.shape)  # 影像雜訊
    out = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
    return np.asarray(out.filter(ImageFilter.GaussianBlur(1.6)))


def jet(v: np.ndarray) -> np.ndarray:
    """MATLAB 的 jet：深藍 → 藍 → 青 → 黃 → 紅 → 深紅（輸入 0–255）。"""
    t = v.astype(float) / 255
    r = np.clip(1.5 - np.abs(4 * t - 3), 0, 1)
    g = np.clip(1.5 - np.abs(4 * t - 2), 0, 1)
    b = np.clip(1.5 - np.abs(4 * t - 1), 0, 1)
    return (np.stack([r, g, b], axis=-1) * 255).astype(np.uint8)


def with_bar(rgb: np.ndarray, bar: np.ndarray) -> Image.Image:
    """影像下方加上色階條，中間留白（與對話框背景同為透明）。"""
    canvas = np.zeros((H + BAR_GAP + BAR_H, W, 4), np.uint8)
    canvas[:H, :, :3] = rgb
    canvas[:H, :, 3] = 255
    canvas[H + BAR_GAP :, :, :3] = bar
    canvas[H + BAR_GAP :, :, 3] = 255
    return Image.fromarray(canvas)


def main() -> None:
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    gray = sem_image()
    ramp = np.tile(np.linspace(0, 255, W).astype(np.uint8), (BAR_H, 1))

    gray_rgb = np.repeat(gray[..., None], 3, axis=-1)
    with_bar(gray_rgb, np.repeat(ramp[..., None], 3, axis=-1)).save(
        out / "defect-gray.webp", quality=88, method=6
    )
    with_bar(jet(gray), jet(ramp)).save(out / "defect-jet.webp", quality=88, method=6)
    print("wrote", out / "defect-gray.webp", out / "defect-jet.webp")


if __name__ == "__main__":
    main()
