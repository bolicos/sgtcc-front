import axios from 'axios'
import { API_BASE_URL } from '#/constants'

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;


// import Authentication from "#/helpers/authentication";

// export const service = axios.create({
//   baseURL: SERVICE_URL
// });

// export const login = axios.create({
//   baseURL: LOGIN_URL
// });

// service.interceptors.request.use(async config => {
//   const [getToken] = Authentication();
//   const token = getToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });