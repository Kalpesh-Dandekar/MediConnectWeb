import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

import { BrowserRouter } from "react-router-dom"

// ✅ Dynamic basename (Vercel vs GitHub Pages)
const basename =
  import.meta.env.PROD && window.location.hostname !== "medi-connect-blush.vercel.app"
    ? "/MediConnectWeb"
    : "/"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)