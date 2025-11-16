import { Bug, LineChart, Brain, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white">
            <Bug className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">BugSage</h1>
            <p className="text-xs text-gray-500 -mt-0.5">AI-assisted quality platform</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          <a className="hover:text-gray-900 transition-colors flex items-center gap-2" href="#metrics"><LineChart className="h-4 w-4"/> Metrics</a>
          <a className="hover:text-gray-900 transition-colors flex items-center gap-2" href="#predictions"><Brain className="h-4 w-4"/> Predictions</a>
          <a className="hover:text-gray-900 transition-colors flex items-center gap-2" href="#settings"><Settings className="h-4 w-4"/> Settings</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="/test" className="text-xs font-medium px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Check Backend</a>
        </div>
      </div>
    </header>
  );
}
