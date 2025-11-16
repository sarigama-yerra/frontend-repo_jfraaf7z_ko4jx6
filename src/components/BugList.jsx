import { useEffect, useState } from "react";
import { ArrowRightCircle, Loader2, Tag } from "lucide-react";

export default function BugList() {
  const [loading, setLoading] = useState(true);
  const [bugs, setBugs] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/bugs`);
      const data = await res.json();
      setBugs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return (
    <div className="flex items-center gap-2 text-gray-500"><Loader2 className="h-4 w-4 animate-spin"/> Loading bugs...</div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Bugs</h3>
        <button onClick={load} className="text-sm text-indigo-600 hover:text-indigo-700">Refresh</button>
      </div>
      <ul className="divide-y">
        {bugs.map(b => (
          <li key={b.id} className="py-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{b.status}</span>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">{b.priority}</span>
                  <span className="text-sm px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">{b.severity}</span>
                </div>
                <h4 className="font-medium text-gray-900 mt-1">{b.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{b.description}</p>
                {b.tags && b.tags.length > 0 && (
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    {b.tags.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700"><Tag className="h-3 w-3"/> {t}</span>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"><span>Open</span> <ArrowRightCircle className="h-4 w-4"/></a>
            </div>
          </li>
        ))}
        {bugs.length === 0 && (
          <li className="py-6 text-center text-gray-500">No bugs yet. Create one!</li>
        )}
      </ul>
    </div>
  );
}
