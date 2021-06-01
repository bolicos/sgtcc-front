export const ROUTES = {
    HOME: () => "/",
    SIGNIN: () => "/signin",
    SIGNUP: () => "/signup",
    SIGNOUT: () => "/signout",
    NOT_FOUND: () => "/not-found",
    DASHBOARD: () => "/dashboard"
  };
  
  export const BASE_URL: string = process.env.PUBLIC_URL || "";
  export const API_BASE_URL: string = process.env.REACT_APP_BFF_URL || "";