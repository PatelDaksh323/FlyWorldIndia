import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// Production uses BrowserRouter (clean URLs, prerender-friendly). The
// self-contained single-file preview build (VITE_SINGLEFILE) uses HashRouter
// so routing works from a single static file with no server rewrites.
const Router = import.meta.env.VITE_SINGLEFILE ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
