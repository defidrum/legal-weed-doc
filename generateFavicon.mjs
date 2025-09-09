// generateFavicon.mjs

import { createCanvas } from "canvas";
import fs from "fs";
import path from "path";

// Favicon size
const size = 64;

// Create canvas
const canvas = createCanvas(size, size);
const ctx = canvas.getContext("2d");

// Fill background transparent
ctx.clearRect(0, 0, size, size);

// Draw emoji 🍃 centered
ctx.font = `${size * 0.9}px serif`;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "green";
ctx.fillText("🍃", size / 2, size / 2);

// Output path
const outputPath = path.join(process.cwd(), "public", "favicon.png");

// Make sure folder exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Write PNG
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(outputPath, buffer);

console.log("✅ Favicon generated at:", outputPath);
