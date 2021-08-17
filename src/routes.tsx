import React, { lazy, Suspense } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ROUTES } from "#/constants"
import { isAuthenticated } from "#/helpers/auth";
import { Loader } from "#/components/Loader";

// Utils PAGES
const HomePage = lazy(() => import("#/pages/Home"));
const Dashboard = lazy(() => import("#/pages/Dashboard"));
const SignInPage = lazy(() => import("#/pages/Auth/SignIn"));
const SignUpPage = lazy(() => import("#/pages/Auth/SignUp"));
const NotFoundPage = lazy(() => import("#/pages/NotFound"));

// Teachers Pages
const TeacherCreatePage = lazy(() => import("#/pages/Teacher/Create"));
const TeacherDetailsPage = lazy(() => import("#/pages/Teacher/Details"));
const TeacherEditPage = lazy(() => import("#/pages/Teacher/Edit"));

// Student Pages
const StudentCreatePage = lazy(() => import("#/pages/Student/Create"));
const StudentDetailsPage = lazy(() => import("#/pages/Student/Details"));
const StudentEditPage = lazy(() => import("#/pages/Student/Edit"));

// Proposal Pages
const ProposalCreatePage = lazy(() => import("#/pages/Proposal/Create"));
const ProposalDetailsPage = lazy(() => import("#/pages/Proposal/Details"));
const ProposalEditPage = lazy(() => import("#/pages/Proposal/Edit"));


const PrivateRoute = ({ isAuthenticated, component, ...rest }: any) => {
  const routeComponent = (props: any) => (
    isAuthenticated
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: ROUTES.HOME(), state: { from: props.location } }} />
  );
  return <Route {...rest} render={routeComponent} />;
};

export const Routes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={Loader}>
      <Switch>
        
        <Route exact path={ROUTES.HOME()} component={HomePage} />
        <Route exact path={ROUTES.SIGNIN()} component={SignInPage} />
        <Route exact path={ROUTES.SIGNUP()} component={SignUpPage} />
        <Route exact path={ROUTES.NOT_FOUND()} component={NotFoundPage} />

        <Route exact path={ROUTES.TEACHER_CREATE()} component={TeacherCreatePage} />
        <Route exact path={ROUTES.TEACHER_DETAILS(":id")} component={TeacherDetailsPage} />
        <Route exact path={ROUTES.TEACHER_EDIT(":id")} component={TeacherEditPage} />

        <Route exact path={ROUTES.STUDENT_CREATE()} component={StudentCreatePage} />        
        <Route exact path={ROUTES.STUDENT_DETAILS(":id")} component={StudentDetailsPage} />
        <Route exact path={ROUTES.STUDENT_EDIT(":id")} component={StudentEditPage} />

        <Route exact path={ROUTES.PROPOSAL_DETAILS(":id")} component={ProposalDetailsPage} />
        <Route exact path={ROUTES.PROPOSAL_EDIT(":id")} component={ProposalEditPage} />
        <Route exact path={ROUTES.PROPOSAL_CREATE()} component={ProposalCreatePage} />

        <PrivateRoute exact path={ROUTES.DASHBOARD()} isAuthenticated={isAuthenticated()} component={Dashboard} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);