The session dashboard shows a live "active for" timer in the top-right corner. It's supposed to count up every second so support staff know how long a customer session has been open.

The timer mounts, ticks once — 0s becomes 1s — and stops. It doesn't freeze or throw. It just stays at 1s indefinitely. The interval is clearly running; a console.log inside the callback confirms it fires on schedule. The state setter isn't erroring. The number just never moves past 1.

A colleague restarted the dev server, cleared the cache, and checked for stale builds. Nothing changed.
