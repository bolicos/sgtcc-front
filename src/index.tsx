import React from "react"
import ReactDOM from "react-dom"

import Mirage from "#/services/mirage";
import "#/assets/styles/global.scss"

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Routes } from "./routes";

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