import { useEffect, useState } from "react";
import { Activity, Gauge, TrendingUp } from "lucide-react";

export default function Metrics() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const [data, setData] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/metrics/overview`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  if (!data) return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm text-gray-500">Loading metrics...</div>
  );

  return (
    <section id="metrics" className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat icon={<Activity className="h-5 w-5 text-indigo-600"/>} label="Total Bugs" value={data.totals.bugs} />
        <Stat icon={<Gauge className="h-5 w-5 text-indigo-600"/>} label="MTTR (hrs)" value={data.mttr_hours ?? '—'} />
        <Stat icon={<TrendingUp className="h-5 w-5 text-indigo-600"/>} label="Bug Density" value={`${data.bug_density}`} />
      </div>
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-2">Trends (last 8 weeks)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrendCard title="Inflow" series={data.trend.inflow} color="indigo" />
          <TrendCard title="Outflow" series={data.trend.outflow} color="emerald" />
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-2">Module Quality</h4>
        <div className="space-y-2">
          {data.module_scores.map((m) => (
            <div key={m.module} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{m.module}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">bugs {m.bugs} / commits {m.commits}</span>
                <div className="w-40 h-2 bg-gray-100 rounded">
                  <div style={{width: `${m.quality_score}%`}} className="h-2 bg-emerald-500 rounded"></div>
                </div>
                <span className="text-sm font-medium">{m.quality_score}</span>
              </div>
            </div>
          ))}
          {data.module_scores.length === 0 && (
            <p className="text-sm text-gray-500">No data yet. Create bugs or ingest commits.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }){
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TrendCard({ title, series, color }){
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <h5 className="font-medium text-gray-800 mb-3">{title}</h5>
      <div className="h-28 w-full bg-gradient-to-b from-white to-gray-50 rounded flex items-end gap-1 p-2">
        {series.map((s) => (
          <div key={s.week} title={`${s.week}: ${s.count}`} className={`flex-1 rounded-t bg-${color}-500`} style={{height: `${Math.min(100, s.count * 20)}%`}}></div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        {series.map(s => <span key={s.week}>{s.week.split('W')[1]}</span>)}
      </div>
    </div>
  );
}
