import React, { lazy, Suspense } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { ROUTES } from "#/constants"
import { isAuthenticated } from "#/helpers/auth";
import { Loader } from "#/components/Loader";

const HomePage = lazy(() => import("#/pages/Home"));
const SignInPage = lazy(() => import("#/pages/SignIn"));
const SignUpPage = lazy(() => import("#/pages/SignUp"));
const RegisterTeacherPage = lazy(() => import("#/pages/RegisterTeacher"));
const RegisterStudentPage = lazy(() => import("#/pages/RegisterStudent"));
const TeacherDetailsPage = lazy(() => import("#/pages/TeacherDetails "));
const EditTeacherPage = lazy(() => import("#/pages/EditTeacher"));
const StudentDetailsPage = lazy(() => import("#/pages/StudentDetails"));
const EditStudentPage = lazy(() => import("#/pages/EditStudent"));
const ProposalDetailsPage = lazy(() => import("#/pages/ProposalDetails"));
const EditProposalPage = lazy(() => import("#/pages/EditProposal"));
const NotFoundPage = lazy(() => import("#/pages/NotFound"));

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
        <Route exact path={ROUTES.REGISTER_TEACHER()} component={RegisterTeacherPage} />
        <Route exact path={ROUTES.REGISTER_STUDENT()} component={RegisterStudentPage} />
        <Route exact path={ROUTES.TEACHER_DETAILS(":id")} component={TeacherDetailsPage} />
        <Route exact path={ROUTES.EDIT_TEACHER(":id")} component={EditTeacherPage} />
        <Route exact path={ROUTES.STUDENT_DETAILS(":id")} component={StudentDetailsPage} />
        <Route exact path={ROUTES.EDIT_STUDENT(":id")} component={EditStudentPage} />
        <Route exact path={ROUTES.PROPOSAL_DETAILS(":id")} component={ProposalDetailsPage} />
        <Route exact path={ROUTES.EDIT_PROPOSAL(":id")} component={EditProposalPage} />
        <Route exact path={ROUTES.NOT_FOUND()} component={NotFoundPage} />
        <PrivateRoute exact path={ROUTES.DASHBOARD()} isAuthenticated={isAuthenticated()} component={HomePage} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);