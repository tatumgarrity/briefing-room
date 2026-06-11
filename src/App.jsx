import './App.css'
import { useEffect, useState } from 'react'

const ENDPOINT = 'http://localhost:3001/api/briefing'

function blockText(block) {
  const obj = block?.[block?.type]
  const rich = obj?.rich_text ?? []
  return rich.map((r) => r.plain_text ?? r.text?.content ?? '').join('').trim()
}

function parseBriefing(blocks) {
  const groups = []
  let current = []
  let lastUpdated = null

  for (const block of blocks) {
    if (block.type === 'divider') {
      if (current.length) groups.push(current)
      current = []
      continue
    }
    const text = blockText(block)
    if (/^last updated/i.test(text)) {
      lastUpdated = text
      continue
    }
    if (text === '') continue
    current.push(text)
  }
  if (current.length) groups.push(current)

  const [header = [], ...sections] = groups
  return { header, sections, lastUpdated }
}

function HeaderCard({ lines }) {
  const [greeting, date, ...rest] = lines
  const narrative = rest.join(' ')
  return (
    <div className="header-card">
      {greeting && <div className="header-greeting">{greeting}</div>}
      {narrative && <div className="header-narrative">{narrative}</div>}
      {date && (
        <div className="header-meta">
          <span className="header-date">{date}</span>
        </div>
      )}
    </div>
  )
}

function SectionCard({ lines }) {
  const [label, ...body] = lines
  return (
    <div className="card">
      <div className="card-label">{label}</div>
      {body.map((line, i) => (
        <div key={i} className="body-text" style={{ marginTop: i ? 8 : 0 }}>
          {line}
        </div>
      ))}
    </div>
  )
}

function Footer({ lastUpdated, onRefresh }) {
  return (
    <div className="footer">
      <span className="footer-ts">{lastUpdated || ''}</span>
      <button className="refresh-btn" onClick={onRefresh}>
        Refresh
      </button>
    </div>
  )
}

export default function App() {
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)

  async function load() {
    setStatus('loading')
    try {
      const res = await fetch(ENDPOINT)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const blocks = json.blocks ?? []
      if (!blocks.length) {
        setData(null)
        setStatus('empty')
        return
      }
      setData(parseBriefing(blocks))
      setStatus('ready')
    } catch {
      setData(null)
      setStatus('empty')
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (status === 'loading') {
    return (
      <div className="app">
        <div className="card">
          <div className="body-text muted">Loading briefing…</div>
        </div>
      </div>
    )
  }

  if (status === 'empty') {
    return (
      <div className="app">
        <div className="card">
          <div className="body-text muted">
            No briefing yet — say good morning to Vera
          </div>
        </div>
        <Footer lastUpdated={null} onRefresh={load} />
      </div>
    )
  }

  return (
    <div className="app">
      <HeaderCard lines={data.header} />
      {data.sections.map((lines, i) => (
        <SectionCard key={i} lines={lines} />
      ))}
      <Footer lastUpdated={data.lastUpdated} onRefresh={load} />
    </div>
  )
}