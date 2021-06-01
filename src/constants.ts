export const ROUTES = {
    HOME: () => "/",
    LOGIN: () => "/login"
  };
  
  export const BASE_URL: string = process.env.PUBLIC_URL || "";
  export const API_BASE_URL: string = process.env.REACT_APP_BFF_URL || "";