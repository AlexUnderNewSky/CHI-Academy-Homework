import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Импортируем Provider
import store from "./store/store";
import App from "./App"; // Импортируем главный компонент приложения

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    {" "}
    {/* Оборачиваем приложение в Provider */}
    <App />
  </Provider>
);
