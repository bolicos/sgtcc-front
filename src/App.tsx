import React, { Fragment, StrictMode } from "react"
import { hot } from "react-hot-loader/root"
import { Routes } from "#/routes"
import "#/assets/styles/global.scss"

export const App: React.FC = () => {
  return (
    <Fragment>
        <StrictMode>
          <Routes />
        </StrictMode>
    </Fragment>
  );
}

export default hot(App);