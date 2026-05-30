"use client";

import { useState } from "react";

// Predefined harmonious color sets
const HARMONIES = [
  { name: "Random", generate: () => Array.from({ length: 5 }, () => randomColor()) },
  { name: "Warm", generate: () => generateWarmPalette() },
  { name: "Cool", generate: () => generateCoolPalette() },
  { name: "Pastel", generate: () => generatePastelPalette() },
  { name: "Vibrant", generate: () => generateVibrantPalette() },
  { name: "Earth", generate: () => generateEarthPalette() },
  { name: "Ocean", generate: () => generateOceanPalette() },
  { name: "Sunset", generate: () => generateSunsetPalette() },
];

function randomColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 40; // 40-80
  const l = Math.floor(Math.random() * 30) + 35; // 35-65
  return hslToHex(h, s, l);
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateWarmPalette(): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    const h = 0 + Math.random() * 40 + i * 5; // Red to orange range
    const s = 60 + Math.random() * 30;
    const l = 35 + Math.random() * 30;
    return hslToHex(h, s, l);
  });
}

function generateCoolPalette(): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    const h = 200 + Math.random() * 60 + i * 5; // Blue to purple range
    const s = 50 + Math.random() * 30;
    const l = 35 + Math.random() * 30;
    return hslToHex(h, s, l);
  });
}

function generatePastelPalette(): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    const h = (i * 72 + Math.random() * 30) % 360;
    const s = 30 + Math.random() * 20;
    const l = 70 + Math.random() * 15;
    return hslToHex(h, s, l);
  });
}

function generateVibrantPalette(): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    const h = (i * 72 + Math.random() * 20) % 360;
    const s = 80 + Math.random() * 20;
    const l = 45 + Math.random() * 15;
    return hslToHex(h, s, l);
  });
}

function generateEarthPalette(): string[] {
  const hues = [25, 35, 45, 120, 200]; // Brown, tan, gold, green, sky
  return hues.map((h) => hslToHex(h + Math.random() * 15, 30 + Math.random() * 30, 30 + Math.random() * 25));
}

function generateOceanPalette(): string[] {
  const hues = [195, 205, 215, 180, 170]; // Various blues and teals
  return hues.map((h) => hslToHex(h + Math.random() * 10, 50 + Math.random() * 30, 30 + Math.random() * 40));
}

function generateSunsetPalette(): string[] {
  const hues = [0, 15, 30, 280, 330]; // Red, orange, gold, purple, pink
  return hues.map((h) => hslToHex(h + Math.random() * 15, 60 + Math.random() * 30, 40 + Math.random() * 25));
}

export default function ColorPalettePage() {
  const [palette, setPalette] = useState<string[]>(
    HARMONIES[0].generate()
  );
  const [selectedHarmony, setSelectedHarmony] = useState("Random");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [lockedColors, setLockedColors] = useState<Set<number>>(new Set());

  const generateNewPalette = (harmonyName?: string) => {
    const name = harmonyName || selectedHarmony;
    const harmony = HARMONIES.find((h) => h.name === name);
    if (!harmony) return;

    const newColors = harmony.generate();
    const updated = [...palette];
    newColors.forEach((color, i) => {
      if (!lockedColors.has(i)) {
        updated[i] = color;
      }
    });
    setPalette(updated);
    setSelectedHarmony(name);
  };

  const toggleLock = (index: number) => {
    const newLocked = new Set(lockedColors);
    if (newLocked.has(index)) {
      newLocked.delete(index);
    } else {
      newLocked.add(index);
    }
    setLockedColors(newLocked);
  };

  const copyColor = async (color: string, index: number) => {
    await navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(palette.join("\n"));
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Color Palette Generator</h1>
        <p>Generate beautiful color palettes for your design projects.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Color Display */}
        <div className="flex rounded-xl overflow-hidden h-48 shadow-lg">
          {palette.map((color, i) => (
            <button
              key={i}
              className="flex-1 relative group cursor-pointer transition-all hover:flex-[1.5]"
              style={{ backgroundColor: color }}
              onClick={() => copyColor(color, i)}
              title={`Click to copy ${color}`}
            >
              <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded font-mono">
                  {copiedIndex === i ? "Copied!" : color}
                </span>
              </div>
              {/* Lock indicator */}
              {lockedColors.has(i) && (
                <div className="absolute top-2 right-2 text-white/80 text-sm">
                  🔒
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Color Codes */}
        <div className="flex gap-2">
          {palette.map((color, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <button
                onClick={() => copyColor(color, i)}
                className="w-full py-2 bg-white border border-slate-200 rounded-lg font-mono text-xs text-slate-600 hover:border-primary hover:text-primary transition-all"
              >
                {copiedIndex === i ? "✅ Copied" : color}
              </button>
              <button
                onClick={() => toggleLock(i)}
                className={`text-xs ${lockedColors.has(i) ? "text-primary" : "text-slate-400"} hover:text-primary transition-colors`}
                title={lockedColors.has(i) ? "Unlock this color" : "Lock this color"}
              >
                {lockedColors.has(i) ? "🔒 Locked" : "🔓 Lock"}
              </button>
            </div>
          ))}
        </div>

        {/* Harmony Selection */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-medium text-slate-700 mb-4">Color Harmony</h3>
          <div className="flex flex-wrap gap-2">
            {HARMONIES.map((h) => (
              <button
                key={h.name}
                onClick={() => generateNewPalette(h.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedHarmony === h.name
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {h.name}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => generateNewPalette()}
            className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            🎲 Generate New Palette
          </button>
          <button
            onClick={copyAll}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
          >
            {copiedIndex === -1 ? "✅ Copied All" : "📋 Copy All"}
          </button>
        </div>
      </div>
    </div>
  );
}
