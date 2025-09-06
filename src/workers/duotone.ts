// src/workers/duotone.worker.ts

self.addEventListener("message", async (e) => {
  const { imageData, width, height } = e.data;

  // Define duotone colors: heroic green and brave pink
  const color1 = { r: 0x1b, g: 0x60, b: 0x2f }; // #1b602f
  const color2 = { r: 0xf7, g: 0x84, b: 0xc5 }; // #f784c5

  const data = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Calculate luminance (grayscale)
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    const t = luminance / 255; // Normalize to 0-1

    // Interpolate between two colors
    data[i] = Math.round(color1.r + t * (color2.r - color1.r));
    data[i + 1] = Math.round(color1.g + t * (color2.g - color1.g));
    data[i + 2] = Math.round(color1.b + t * (color2.b - color1.b));
    // Alpha (data[i+3]) unchanged
  }

  // Send back processed data
  self.postMessage({ imageData: data, width, height });
});