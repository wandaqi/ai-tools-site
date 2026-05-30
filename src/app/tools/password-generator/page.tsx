"use client";

import { useState } from "react";

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("Please select at least one character type");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    setPassword(result);
  };

  const handleCopy = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = (): { label: string; color: string; width: string } => {
    if (!password) return { label: "-", color: "bg-slate-200", width: "0%" };
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUpper && includeLower) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 20) score++;

    if (score >= 5) return { label: "Very Strong", color: "bg-green-500", width: "100%" };
    if (score >= 4) return { label: "Strong", color: "bg-green-400", width: "80%" };
    if (score >= 3) return { label: "Good", color: "bg-yellow-400", width: "60%" };
    if (score >= 2) return { label: "Fair", color: "bg-orange-400", width: "40%" };
    return { label: "Weak", color: "bg-red-400", width: "20%" };
  };

  const strength = getStrength();

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>Password Generator</h1>
        <p>Generate strong, secure passwords with customizable length and character sets.</p>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Password Display */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 p-4">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click 'Generate' to create a password"
              className="flex-1 font-mono text-lg text-slate-800 outline-none bg-transparent"
            />
            <button
              onClick={handleCopy}
              disabled={!password}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-all shrink-0"
            >
              {copied ? "✅ Copied" : "📋 Copy"}
            </button>
          </div>
          {/* Strength bar */}
          {password && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} rounded-full transition-all duration-300`}
                    style={{ width: strength.width }}
                  />
                </div>
                <span className="text-xs text-slate-500 min-w-[80px] text-right">
                  {strength.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          {/* Length */}
          <div>
            <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Length</span>
              <span className="text-primary font-bold">{length}</span>
            </label>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-slate-700">Symbols (!@#$...)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
          >
            🎲 Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}
