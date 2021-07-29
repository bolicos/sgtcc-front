import React, { lazy, Suspense } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ROUTES, BASE_URL } from "#/constants"
import { isAuthenticated } from "#/helpers/auth";
import { Loading } from "#/components/Loading";

const HomePage = lazy(() => import("#/pages/Home"));
const SignInPage = lazy(() => import("#/pages/SignIn"));
const SignOutPage = lazy(() => import("#/pages/SignOut"));
const SignUpPage = lazy(() => import("#/pages/SignUp"));
const NotFoundPage = lazy(() => import("#/pages/NotFound"));
const CreateProposalPage = lazy(() => import("#/pages/Proposal/Create"));

const PrivateRoute = ({isAuthenticated, component, ...rest}: any) => {
  const routeComponent = (props: any) => (
      isAuthenticated
          ? React.createElement(component, props)
          : <Redirect to={{ pathname: ROUTES.HOME(), state: { from: props.location } }}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};

export const Routes: React.FC = () => (
  <BrowserRouter basename={BASE_URL}>
    <Suspense fallback={Loading}>
      <Switch>
        <Route exact path={ROUTES.HOME()} component={HomePage} />
        <Route exact path={ROUTES.SIGNIN()} component={SignInPage} />
        <Route exact path={ROUTES.SIGNOUT()} component={SignOutPage} />
        <Route exact path={ROUTES.SIGNUP()} component={SignUpPage} />
        <Route exact path={ROUTES.NOT_FOUND()} component={NotFoundPage} />
        <Route exact path={ROUTES.CREATE_PROPOSAL()} component={CreateProposalPage} />
        <PrivateRoute exact path={ROUTES.DASHBOARD()} isAuthenticated={isAuthenticated()} component={HomePage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);