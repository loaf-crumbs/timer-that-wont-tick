import { useState, useEffect } from 'react'

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

export default function SessionTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="session-timer">
      <span className="timer-label">Active for</span>
      <span className="timer-value">{formatDuration(seconds)}</span>
    </div>
  )
}
