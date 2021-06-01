import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ROUTES, BASE_URL } from '#/constants'

const HomePage = lazy(() => import("#/pages/Home"));

export const Routes: React.FC = () => (
    <BrowserRouter basename={BASE_URL}>
    <Suspense fallback="Loading...">
      <Switch>
        <Route exact path={ROUTES.HOME()} component={HomePage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);