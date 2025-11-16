import Header from './components/Header'
import BugForm from './components/BugForm'
import BugList from './components/BugList'
import Metrics from './components/Metrics'
import Predictions from './components/Predictions'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <BugForm onCreated={() => { /* Optionally refresh list via events */ }} />
          </div>
          <div className="md:col-span-2">
            <BugList />
          </div>
        </section>

        <Metrics />
        <Predictions />

        <section id="settings" className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Smart Suggestions</h3>
          <SmartSuggestions />
        </section>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} BugSage</footer>
    </div>
  )
}

import { useEffect, useState } from 'react'
function SmartSuggestions() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${baseUrl}/api/suggestions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) })
        const json = await res.json()
        setData(json)
      } catch (e) { console.error(e) }
    })()
  }, [])
  if (!data) return <p className="text-sm text-gray-500">Loading suggestions...</p>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Test Case Ideas</h4>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {data.test_case_ideas?.map((t, i) => <li key={i}>{t}</li>)}
          {(!data.test_case_ideas || data.test_case_ideas.length===0) && <li className="text-gray-500">No suggestions yet.</li>}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Suggested Reviewers</h4>
        <div className="flex flex-wrap gap-2">
          {data.suggested_reviewers?.map((r) => <span key={r} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{r}</span>)}
          {(!data.suggested_reviewers || data.suggested_reviewers.length===0) && <span className="text-xs text-gray-500">No reviewers suggested.</span>}
        </div>
      </div>
    </div>
  )
}

export default App
