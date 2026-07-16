import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// Production uses BrowserRouter (clean URLs, prerender-friendly). Preview builds
// with no server-side rewrites — the single-file bundle (VITE_SINGLEFILE) and
// the GitHub Pages deploy (VITE_HASH_ROUTER) — use HashRouter so every route
// resolves from a static host with no 404s.
const useHashRouter =
  import.meta.env.VITE_SINGLEFILE || import.meta.env.VITE_HASH_ROUTER;
const Router = useHashRouter ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
