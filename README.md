## Clear the Points (React + Vite)

A simple game where numbered points appear on the board. Your goal is to clear them by clicking in ascending order. After each correct click, a 3-second countdown appears on that point.

### Accepted cases
- **Case 1 — Win (All Cleared)**: Click points strictly in ascending order from 1 up to the entered amount. Each correct click shows a 3s countdown on that point.
- **Case 2 — Game Over**: Clicking any point out of order immediately ends the game.
- **Case 3 — Restart mid-game**: Pressing Restart during play resets the state and starts a new game. Points from 1 to the chosen amount appear again.
- **Case 4 — Auto Play ON**: Turning Auto Play on enables a bot that automatically clicks the correct sequence; no user interaction is needed.
- **Case 5 — Auto Play OFF mid-run**: Turning Auto Play off while active stops the bot immediately.
- **Case 6 — Large inputs**: Entering a large number (e.g., 2000) still renders that many points on the game board.

### Tech stack
- **React**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Web APIs**: `setTimeout`, `setInterval`

### Getting started
- **Install**: `npm install`
- **Develop**: `npm run dev`
- **Build**: `npm run build`

