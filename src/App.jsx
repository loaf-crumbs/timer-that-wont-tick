import { useState } from 'react'
import SessionTimer from './SessionTimer.jsx'
import './App.css'

export default function App() {
  const [sessionOpen, setSessionOpen] = useState(true)

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Support Dashboard</h1>
        {sessionOpen && <SessionTimer />}
      </header>

      <main className="dashboard-body">
        <div className="ticket">
          <h2>Ticket #4821 — Billing issue on Pro plan</h2>
          <p className="ticket-meta">Opened by marina@example.com · Priority: high</p>
          <p>Customer reports they were charged twice for the March billing cycle. Awaiting confirmation from the payments team before issuing a refund.</p>
        </div>

        <div className="controls">
          <button onClick={() => setSessionOpen(v => !v)}>
            {sessionOpen ? 'Close session' : 'Reopen session'}
          </button>
        </div>
      </main>
    </div>
  )
}
