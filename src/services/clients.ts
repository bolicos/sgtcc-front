import axios, { ResponseType, AxiosResponse } from "axios";
import { WEB_APP } from "#/constants";

export interface Response<T = any> extends AxiosResponse<T> { }

export const CLIENTS_BASE_URLS = { 
  SGTCC: () => WEB_APP.API_BASE_URL,
  AUTH: () => WEB_APP.API_AUTH_URL,
};

const AxiosAPIConfiguration = {
  baseURL: WEB_APP.API_BASE_URL,
  timeout: 30000,
  headers: {
    common: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  responseType: "json" as ResponseType,
  withCredentials: false,
};

const AxiosAuthConfiguration = {
  baseURL: WEB_APP.API_AUTH_URL,
  timeout: 30000,
  headers: {
    common: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  responseType: "json" as ResponseType,
  withCredentials: false,
};

export const client = axios.create({
  baseURL: AxiosAPIConfiguration.baseURL,
  timeout: AxiosAPIConfiguration.timeout,
  headers: AxiosAPIConfiguration.headers,
  responseType: AxiosAPIConfiguration.responseType,
  withCredentials: AxiosAPIConfiguration.withCredentials,
});

export const auth = axios.create({
  baseURL: AxiosAuthConfiguration.baseURL,
  timeout: AxiosAuthConfiguration.timeout,
  headers: AxiosAuthConfiguration.headers,
  responseType: AxiosAuthConfiguration.responseType,
  withCredentials: AxiosAuthConfiguration.withCredentials,
});