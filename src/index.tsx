import React from "react"
import ReactDOM from "react-dom"
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Mirage from "#/services/mirage";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Routes } from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);

Mirage();

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();