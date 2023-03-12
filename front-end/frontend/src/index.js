import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";
import { NewBoardProvider } from "./context/NewBoardContext";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <NewBoardProvider>
          <App />
        </NewBoardProvider>
    </AuthProvider>
  </React.StrictMode>
);
