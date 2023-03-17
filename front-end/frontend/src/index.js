import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { NewBoardProvider } from "./modules/newBoard";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <NewBoardProvider>
        <App />
      </NewBoardProvider>
    </Provider>
  </React.StrictMode>
);
