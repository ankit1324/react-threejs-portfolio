import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'

console.log(`
  ____ _   _    _    _   _ ____  _   _    _    ______   __
 / ___| | | |  / \\  | | | |  _ \\| | | |  / \\  |  _ \\ \\ / /
| |   | |_| | / _ \\ | | | | | | | |_| | / _ \\ | |_) \\ V /
| |___|  _  |/ ___ \\| |_| | |_| |  _  |/ ___ \\|  _ < | |
 \\____|_| |_/_/   \\_\\\\___/|____/|_| |_/_/   \\_\\_| \\_\\|_|

    _    _   _ _  _____ _____   ___ _   _
   / \\  | \\ | | |/ /_ _|_   _| |_ _| \\ | |
  / _ \\ |  \\| | ' / | |  | |    | ||  \\| |
 / ___ \\| |\\  | . \\ | |  | | _  | || |\\  |
/_/   \\_\\_| \\_|_|\\_\\___| |_|(_) |___|_| \\_|
`)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics /> {/* To use vercel analytics in layout */}
  </React.StrictMode>,
)
