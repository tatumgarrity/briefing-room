import './App.css'
import { briefing } from './data/briefing.js'

function formatTimestamp(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function HeaderCard({ data }) {
  return (
    <div className="header-card">
      <div className="header-greeting">{data.greeting}</div>
      <div className="header-narrative">{data.narrative}</div>
      <div className="header-meta">
        <span className="header-date">{data.date}</span>
        <span className="header-note">{data.note}</span>
      </div>
    </div>
  );
}

function InnerCircleCard({ data }) {
  return (
    <div className="card">
      <div className="card-label">{data.title}</div>
      {data.people.map((p) => (
        <div key={p.name} className="person-row">
          <div className={"person-dot" + (p.nudge ? " nudge" : "")} />
          <div>
            <div className="person-name">{p.name}</div>
            <div className="person-status">{p.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkCard({ data }) {
  return (
    <div className="card">
      <div className="card-label">{data.title}</div>
      <div className="section-label">Focus</div>
      <div className="body-text">{data.focus}</div>
      <div className="section-label">Open</div>
      <ul className="list">
        {data.open.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="section-label">Waiting</div>
      <ul className="list">
        {data.waiting.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="context-note">{data.context}</div>
    </div>
  );
}

function PressureTestCard({ data }) {
  return (
    <div className="card">
      <div className="card-label">{data.title}</div>
      <div className="status-pill">{data.status}</div>
      <div className="body-text muted">{data.recentActivity}</div>
      <div className="section-label">Open threads</div>
      <ul className="list">
        {data.openThreads.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <div className="section-label">Next milestone</div>
      <div className="body-text">{data.nextMilestone}</div>
    </div>
  );
}

function FocusCard({ data }) {
  return (
    <div className="card">
      <div className="card-label">{data.title}</div>
      <div className="focus-today">{data.today}</div>
      <div className="body-text muted">{data.energy}</div>
      <div className="body-text muted" style={{ marginTop: 10 }}>{data.reminder}</div>
    </div>
  );
}

function Footer({ ts }) {
  return (
    <div className="footer">
      <span className="footer-ts">Updated at {formatTimestamp(ts)}</span>
      <button className="refresh-btn" onClick={() => window.location.reload()}>
        Refresh
      </button>
    </div>
  );
}

export default function App() {
  const b = briefing;
  return (
    <div className="app">
      <HeaderCard data={b.header} />
      <FocusCard data={b.focus} />
      <InnerCircleCard data={b.innerCircle} />
      <WorkCard data={b.work} />
      <PressureTestCard data={b.pressureTest} />
      <Footer ts={b.lastUpdated} />
    </div>
  );
}