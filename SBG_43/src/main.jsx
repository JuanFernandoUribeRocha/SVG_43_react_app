import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { TareasProvider } from "./context/TareasContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TareasProvider>
        <App />
      </TareasProvider>
    </BrowserRouter>
  </StrictMode>
);
