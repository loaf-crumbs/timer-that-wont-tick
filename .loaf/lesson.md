# Why the timer ticks once and gives up

## What you saw

The timer mounts, goes from `0s` to `1s`, and stops dead. The interval is clearly alive — a `console.log` inside the callback fires every second, right on schedule. The state setter doesn't throw. Yet the number never moves past `1`.

That combination — the callback runs, the setter runs, the screen doesn't change — is the tell. It's not a timing bug. It's a **memory** bug.

## What's actually happening

Here's the original effect:

```jsx
const [seconds, setSeconds] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(seconds + 1)
  }, 1000)
  return () => clearInterval(interval)
}, [])
```

The dependency array is empty, so the effect runs **once**, on mount. At that moment, `seconds` is `0`. The arrow function passed to `setInterval` closes over that `seconds` — and because the effect never re-runs, that closure is never replaced. Every tick, forever, runs the same line: `setSeconds(0 + 1)`.

Tick 1: `setSeconds(1)` — the screen updates to `1`.
Tick 2: `setSeconds(1)` — React compares `1` to the current `1`, sees no change, and skips the re-render.
Tick 3: `setSeconds(1)`. Tick 4: `setSeconds(1)`. The interval is doing its job perfectly; it's just computing the same answer every time.

The interval callback isn't reading "the current value of `seconds`." JavaScript closures capture **variables from the scope where the function was created**, not from the scope where it runs. The callback was created during the first render, where `seconds` was `0`, and it's frozen there.

## The fix

Stop reading `seconds` inside the callback. `setState` accepts a function — the **updater form** — that receives the latest committed value and returns the next one:

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1)
  }, 1000)
  return () => clearInterval(interval)
}, [])
```

`prev` is whatever React currently holds, not whatever the closure captured. Now tick 2 computes `1 + 1`, tick 3 computes `2 + 1`, and the timer climbs.

You might be tempted to "fix" it instead by adding `seconds` to the dependency array. That technically works — but it tears down and recreates the interval every single second, which is wasteful and can drift. The updater form keeps one stable interval for the component's whole life. Prefer it.

## The bug class: stale closure

This is the **stale closure**, the most common React bug there is. It shows up any time a long-lived callback — an interval, a timeout, an event listener, a subscription — reads state or props directly while living inside an effect that doesn't re-run.

How to spot it in the wild:

- A callback set up once (empty or thin dependency array) that reads a value which is *supposed* to change over time.
- The symptom is almost always "it works once, then freezes on the first value" — exactly what you saw here.
- The smell: any `setX(x + something)`, `setItems([...items, new])`, or `setCount(count * 2)` **inside** a callback that outlives the render. Reach for the updater form (`setX(prev => …)`) so you never depend on the captured value.

Once you've internalized "the callback froze the variable at creation time," you'll see this same shape behind a dozen different symptoms.
