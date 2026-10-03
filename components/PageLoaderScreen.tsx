"use client";

import React from "react";

export default function PageLoaderScreen() {
  return (
    <div
      className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center"
      style={{ zIndex: 2147483000 }}
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading...</p>
      </div>
    </div>
  );
}
