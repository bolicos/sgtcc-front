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
  NOT_FOUND: () => "/",
  DASHBOARD: () => "/dashboard",

  TEACHER_CREATE: () => "/register-teacher",
  TEACHER_DETAILS: (id: string) => `/teachers/${id}/details`,
  TEACHER_EDIT: (id: string) => `/teachers/${id}/edit`,

  STUDENT_CREATE: () => "/register-student",
  STUDENT_DETAILS: (id: string) => `/students/${id}/details`,
  STUDENT_EDIT: (id: string) => `/students/${id}/edit`,

  PROPOSAL_CREATE: () => "/proposals",  
  PROPOSAL_DETAILS: (id: string) => `/proposals/${id}/details`,
  PROPOSAL_EDIT: (id: string) => `/proposals/${id}/edit`,
};
