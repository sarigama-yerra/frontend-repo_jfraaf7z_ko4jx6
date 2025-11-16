import { useEffect, useState } from "react";

export default function Predictions() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/predictions/modules`);
      const json = await res.json();
      setData(json.modules);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  if (!data) return (
    <section id="predictions" className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">Loading predictions...</section>
  );

  return (
    <section id="predictions" className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-3">Risky Modules</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map(m => (
          <div key={m.module} className="rounded-md border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{m.module}</p>
                <p className="text-xs text-gray-500">bugs {m.bugs} • churn {m.churn} • recent {m.recent_commits}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${m.heat === 'high' ? 'bg-rose-100 text-rose-700' : m.heat === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{m.heat}</span>
            </div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded">
                <div className="h-2 bg-rose-500 rounded" style={{width: `${Math.min(100, m.risk_score*8)}%`}}></div>
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-gray-500">No data yet. Ingest commits and create bugs.</p>
        )}
      </div>
    </section>
  );
}
