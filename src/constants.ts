export const WEB_APP = {
  NAME: process.env.REACT_APP_NAME,
  ENVIRONMENT: process.env.REACT_APP_ENV,
  BASE_URL: process.env.REACT_APP_BASE_URL,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  API_AUTH_URL: process.env.REACT_APP_API_AUTH_URL,
};

export const ROUTES = {
  HOME: () => "/",
  SIGNIN: () => "/sign-in",
  SIGNUP: () => "/sign-up",
  NOT_FOUND: () => "/not-found",
  DASHBOARD: () => "/dashboard"
};