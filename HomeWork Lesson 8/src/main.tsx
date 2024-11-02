import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const domContainer = document.getElementById("root");
if (!domContainer) {
  throw new Error("Failed to find the root element");
}
const root = createRoot(domContainer);
root.render(<App />);
