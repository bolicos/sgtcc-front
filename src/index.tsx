import React from "react"
import ReactDOM from "react-dom"
import Mirage from "#/services/mirage";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Routes } from "./routes";
import "#/assets/styles/global.scss"

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById("root")
);

if(process.env.NODE_ENV !== "production")
  Mirage();

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();