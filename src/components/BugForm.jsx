import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function BugForm({ onCreated }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    severity: "minor",
    module_path: "",
    tags: "",
  });

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      const res = await fetch(`${baseUrl}/api/bugs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        onCreated?.(data);
        setForm({ title: "", description: "", priority: "medium", severity: "minor", module_path: "", tags: "" });
      } else {
        alert(data.detail || "Failed to create bug");
      }
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Create Bug</h3>
        <button disabled={loading} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-md">
          <PlusCircle className="h-4 w-4" />
          {loading ? "Creating..." : "Add"}
        </button>
      </div>
      <input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Title" className="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      <textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} placeholder="Description" rows={3} className="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      <div className="grid grid-cols-2 gap-3">
        <select value={form.priority} onChange={(e)=>setForm({...form, priority:e.target.value})} className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <select value={form.severity} onChange={(e)=>setForm({...form, severity:e.target.value})} className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
          <option value="minor">Minor</option>
          <option value="major">Major</option>
          <option value="critical">Critical</option>
          <option value="blocker">Blocker</option>
        </select>
      </div>
      <input value={form.module_path} onChange={(e)=>setForm({...form, module_path:e.target.value})} placeholder="Module/Path (e.g., services/auth.py)" className="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
      <input value={form.tags} onChange={(e)=>setForm({...form, tags:e.target.value})} placeholder="Tags (comma separated)" className="w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
    </form>
  );
}
