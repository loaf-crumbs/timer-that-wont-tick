# timer-that-wont-tick

A Loaf crumb. Clone it, run it, find what's broken.

## Setup

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## What you're looking at

A support dashboard with a live session timer in the top-right corner. Use the "Close session / Reopen session" button to mount and unmount the timer component.

## Files

```
src/
├── App.jsx          — dashboard shell, mounts/unmounts the timer
└── SessionTimer.jsx — the timer component
```

The bug lives in `SessionTimer.jsx`.
