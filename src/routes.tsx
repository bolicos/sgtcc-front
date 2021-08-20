import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "#/constants";
import { AUTH } from "#/helpers/Auth";

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
import ProposalListPage from "#/pages/Proposal/List";
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

const PrivateRoute = ({ component, ...rest }: any) => {
  const isAuthenticated = AUTH.IS_AUTHENTICATE();

  const routeComponent = (props: any) =>
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: ROUTES.HOME(), state: { from: props.location } }} />
    );

  return <Route {...rest} render={routeComponent} />;
};

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.HOME()} component={HomePage} />
        <Route exact path={ROUTES.SIGNIN()} component={SignInPage} />
        <Route exact path={ROUTES.SIGNUP()} component={SignUpPage} />

        <PrivateRoute exact path={ROUTES.TEACHER_CREATE()} component={TeacherCreatePage} />
        <PrivateRoute exact path={ROUTES.TEACHER_DETAILS(":id")} component={TeacherDetailsPage} />
        <PrivateRoute exact path={ROUTES.TEACHER_EDIT(":id")} component={TeacherEditPage} />

        <PrivateRoute exact path={ROUTES.STUDENT_CREATE()} component={StudentCreatePage} />
        <PrivateRoute exact path={ROUTES.STUDENT_DETAILS(":id")} component={StudentDetailsPage} />
        <PrivateRoute exact path={ROUTES.STUDENT_EDIT(":id")} component={StudentEditPage} />

        <PrivateRoute exact path={ROUTES.PROPOSAL_LIST()} component={ProposalListPage} />
        <PrivateRoute exact path={ROUTES.PROPOSAL_CREATE()} component={ProposalCreatePage} />
        <PrivateRoute exact path={ROUTES.PROPOSAL_DETAILS(":id")} component={ProposalDetailsPage} />
        <PrivateRoute exact path={ROUTES.PROPOSAL_EDIT(":id")} component={ProposalEditPage} />

        <PrivateRoute exact path={ROUTES.EXAMINATION_CREATE()} component={ExaminationCreatePage} />
        <PrivateRoute exact path={ROUTES.EXAMINATION_DETAILS(":id")} component={ExaminationDetailsPage} />
        <PrivateRoute exact path={ROUTES.EXAMINATION_EDIT(":id")} component={ExaminationEditPage} />

        <PrivateRoute exact path={ROUTES.BOARD_CREATE()} component={BoardCreatePage} />
        <PrivateRoute exact path={ROUTES.BOARD_DETAILS(":id")} component={BoardDetailsPage} />
        <PrivateRoute exact path={ROUTES.BOARD_EDIT(":id")} component={BoardEditPage} />

        <PrivateRoute exact path={ROUTES.DASHBOARD()} component={Dashboard} />
        <Route path={ROUTES.NOT_FOUND()} component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
