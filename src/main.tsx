import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AppRouter from "./app-router.component.tsx";

import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <AppRouter />
      <ToastContainer theme="colored" />
    </HashRouter>
  </React.StrictMode>
);
