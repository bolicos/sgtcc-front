export const WEB_APP = {
  NAME: process.env.REACT_APP_NAME,
  ENVIRONMENT: process.env.REACT_APP_ENV,
  BASE_URL: process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL_PRD,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  API_AUTH_URL: process.env.REACT_APP_API_AUTH_URL,
};

export const ROUTES = {
  HOME: () => "/",
  SIGNIN: () => "/sign-in",
  SIGNUP: () => "/sign-up",
  REGISTER_TEACHER: () => "/register-teacher",
  REGISTER_STUDENT: () => "/register-student",
  TEACHER_DETAILS: (id: string) => `/teachers/${id}/details`,
  EDIT_TEACHER: (id: string) => `/teachers/${id}/edit`,
  STUDENT_DETAILS: (id: string) => `/students/${id}/details`,
  EDIT_STUDENT: (id: string) => `/students/${id}/edit`,
  PROPOSAL_DETAILS: (id: string) => `/proposals/${id}/details`,
  EDIT_PROPOSAL: (id: string) => `/proposals/${id}/edit`,
  NOT_FOUND: () => "/not-found",
  DASHBOARD: () => "/dashboard"
};