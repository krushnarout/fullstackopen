# Bloglist

Part 7 continuation of the bloglist application. State management is done in two
alternative ways, each in its own folder:

- `redux/` — notification state managed with Redux Toolkit (exercise 7.10)
- `zustand/` — notification state managed with Zustand (exercise 7.11)

Both folders contain the same `bloglist-backend` and a `bloglist-frontend` that
differ only in how shared state is handled.

## 7.11: Zustand, Step 1

The notification data is managed by a Zustand store in
`zustand/bloglist-frontend/src/stores/notificationStore.js`.

The store holds the notification `message` and `type`, and exposes two actions:

- `showNotification(message, type, timeInSeconds)` — sets the notification and
  clears it automatically after the given time (5 seconds by default). A pending
  timeout is cancelled first, so a new notification always gets its full time.
- `clearNotification()` — clears the notification immediately.

`Notification` subscribes to the store directly, so no notification props are
passed down, and `App` only needs the `showNotification` action. The Redux
`Provider` and `store.js` are gone from `main.jsx`.

## Running

```bash
cd zustand/bloglist-backend && npm install && npm run dev
cd zustand/bloglist-frontend && npm install && npm run dev
```
