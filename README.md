# Duotone Identity — On-Device Image Filtering

**[Live Demo](https://duotone-app-psi.vercel.app/)** | **[GitHub Repository](https://github.com/caseinn/duotone-filter)**

A privacy-first, browser-based image filter that applies a symbolic **duotone gradient** using **Brave Pink** (`#f784c5`) and **Heroic Green** (`#1b602f`) — colors rooted in the Indonesian digital solidarity movement.

> 🌐 **100% client-side** — No uploads. No tracking. Your images never leave your device.

---

## 🎨 Purpose & Symbolism

- **Brave Pink**: Represents civilian courage.
- **Heroic Green**: Symbolizes collective struggle and resilience.
- Together, they form a visual language of **quiet resistance and hope** in digital spaces.

This tool is both a functional image processor and a statement on digital autonomy.

---

## ✨ Features

- **Local Processing**: All image manipulation happens in your browser.
- **Drag & Drop** or **File Picker** support.
- Accepts **PNG, JPG, and WebP** (max 25 MB).
- Real-time **duotone filter preview**.
- **One-click PNG download** with auto-generated filename (`{original}-duotone.png`).
- Built with **Web Workers** to keep the UI responsive during processing.
- **Memory-safe**: Object URLs are properly revoked to prevent leaks.

---

## 🛠️ Tech Stack

- **Framework**: React + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS with custom theme & `@font-face`
- **Fonts**:  
  - Display: **Archivo Black**  
  - Body: **Space Grotesk**  
  - Code: **JetBrains Mono**
- **Icons**: Lucide React
- **Animation**: `tw-animate-css`
- **Worker**: Dedicated Web Worker for pixel-level duotone mapping

---

## 🧪 How It Works

1. User selects or drops an image.
2. A preview is generated using `URL.createObjectURL`.
3. The image is drawn onto a `<canvas>`, and pixel data is extracted.
4. A **Web Worker** processes each pixel:
   - Computes luminance (grayscale value).
   - Interpolates between Heroic Green (dark) and Brave Pink (light).
5. The filtered image is rendered and made available for download as a **PNG**.

No data is sent to any server — everything stays on your machine.

---

## 📦 Local Development

```bash
# Clone the repo
git clone https://github.com/caseinn/duotone-identity.git
cd duotone-identity

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📄 License

MIT License — feel free to use, remix, or adapt for personal or activist projects.

> Created by **[Dito Rifki Irawan](https://instagram.com/ditorifkii)** (@caseinn)  
> 📍 Inspired by digital resistance in Indonesia

---

## ❤️ Support

If you find this project meaningful:
- ⭐ Star the repo
- 🔗 Follow [@ditorifkii on Instagram](https://instagram.com/ditorifkii) or explore more on [GitHub @caseinn](https://github.com/caseinn)

---

*Your image. Your device. Your voice.*
