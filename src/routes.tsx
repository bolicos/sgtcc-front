import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "#/constants";
import { isAuthenticated } from "#/helpers/auth";

// Utils PAGES
import HomePage from "#/pages/Home";
import Dashboard from "#/pages/Dashboard";
import SignInPage from "#/pages/Auth/SignIn";
import SignUpPage from "#/pages/Auth/SignUp";
import NotFoundPage from "#/pages/NotFound";

// Teachers Pages
import TeacherCreatePage from "#/pages/Teacher/Create";
import TeacherDetailsPage from "#/pages/Teacher/Details";
import TeacherEditPage from "#/pages/Teacher/Edit";

// Student Pages
import StudentCreatePage from "#/pages/Student/Create";
import StudentDetailsPage from "#/pages/Student/Details";
import StudentEditPage from "#/pages/Student/Edit";

// Proposal Pages
import ProposalCreatePage from "#/pages/Proposal/Create";
import ProposalDetailsPage from "#/pages/Proposal/Details";
import ProposalEditPage from "#/pages/Proposal/Edit";

// Examination Pages
import ExaminationCreatePage from "#/pages/Examination/Create";
import ExaminationDetailsPage from "#/pages/Examination/Details";
import ExaminationEditPage from "#/pages/Examination/Edit";

// Board Pages
import BoardCreatePage from "#/pages/Board/Create";
import BoardDetailsPage from "#/pages/Board/Details";
import BoardEditPage from "#/pages/Board/Edit";

const PrivateRoute = ({ isAuthenticated, component, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: ROUTES.HOME(), state: { from: props.location } }} />
    );
  return <Route {...rest} render={routeComponent} />;
};

export const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME()} component={HomePage} />
      <Route exact path={ROUTES.SIGNIN()} component={SignInPage} />
      <Route exact path={ROUTES.SIGNUP()} component={SignUpPage} />

      <Route exact path={ROUTES.TEACHER_CREATE()} component={TeacherCreatePage} />
      <Route exact path={ROUTES.TEACHER_DETAILS(":id")} component={TeacherDetailsPage} />
      <Route exact path={ROUTES.TEACHER_EDIT(":id")} component={TeacherEditPage} />

      <Route exact path={ROUTES.STUDENT_CREATE()} component={StudentCreatePage} />
      <Route exact path={ROUTES.STUDENT_DETAILS(":id")} component={StudentDetailsPage} />
      <Route exact path={ROUTES.STUDENT_EDIT(":id")} component={StudentEditPage} />

      <Route exact path={ROUTES.PROPOSAL_CREATE()} component={ProposalCreatePage} />
      <Route exact path={ROUTES.PROPOSAL_DETAILS(":id")} component={ProposalDetailsPage} />
      <Route exact path={ROUTES.PROPOSAL_EDIT(":id")} component={ProposalEditPage} />

      <Route exact path={ROUTES.EXAMINATION_CREATE()} component={ExaminationCreatePage} />
      <Route exact path={ROUTES.EXAMINATION_DETAILS(":id")} component={ExaminationDetailsPage} />
      <Route exact path={ROUTES.EXAMINATION_EDIT(":id")} component={ExaminationEditPage} />

      <Route exact path={ROUTES.BOARD_CREATE()} component={BoardCreatePage} />
      <Route exact path={ROUTES.BOARD_DETAILS(":id")} component={BoardDetailsPage} />
      <Route exact path={ROUTES.BOARD_EDIT(":id")} component={BoardEditPage} />

      <PrivateRoute exact path={ROUTES.DASHBOARD()} isAuthenticated={isAuthenticated()} component={Dashboard} />
      <Route path={ROUTES.NOT_FOUND()} component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);
