"use client";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>(null);
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Political Tracker KE</h1>
      <p className="mb-6 text-gray-600">Build successful! Now we can add charts.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded">Ruto Support: 45%</div>
        <div className="p-4 border rounded">Raila Support: 35%</div>
      </div>
    </main>
  );
}