import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/CodeManagementPanel">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
