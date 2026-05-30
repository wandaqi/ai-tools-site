"use client";

/**
 * Ad placeholder component.
 * Replace the placeholder with your actual ad code (Google AdSense, etc.)
 * once your site is approved.
 */
export default function AdSpace({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-slate-50 border border-dashed border-slate-300 rounded-lg p-4 text-center ${className}`}>
      <p className="text-xs text-slate-400 uppercase tracking-wider">Advertisement</p>
      <div className="h-[90px] flex items-center justify-center">
        <span className="text-sm text-slate-400">
          Ad space — Replace with Google AdSense
        </span>
      </div>
    </div>
  );
}
