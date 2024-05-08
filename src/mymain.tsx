import React from "react";
import ReactDOM from "react-dom/client";
import App1 from "./App1";
import "./index.css";
import { configResponsive } from "ahooks";

configResponsive({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>,
);
