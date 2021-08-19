import axios, { AxiosResponse } from "axios";
import { WEB_APP } from "#/constants";

export interface Response<T = any> extends AxiosResponse<T> {}
export interface List<T> extends Promise<Response<Array<T>>> { }
export interface Object<T> extends Promise<Response<T>> { }

export const CLIENTS_BASE_URLS = {
  SGTCC: () => WEB_APP.API_BASE_URL,
  AUTH: () => WEB_APP.API_AUTH_URL,
};

const AxiosAPIConfiguration = {
  baseURL: WEB_APP.API_BASE_URL,
};

const AxiosAuthConfiguration = {
  baseURL: WEB_APP.API_AUTH_URL,
};

export const client = axios.create({
  baseURL: AxiosAPIConfiguration.baseURL,
});

export const auth = axios.create({
  baseURL: AxiosAuthConfiguration.baseURL,
});
