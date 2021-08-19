import { Object, auth } from "./clients";
import { User } from "#/models/user";
import { JwtToken } from "#/models/response/user";

export const ENDPOINTS = {
  SIGN_IN: () => "/api/login",
};

export const API = {
  AUTH: {
    SIGN_IN: (body: User): Object<JwtToken> => auth.post(ENDPOINTS.SIGN_IN(), body),
  },
};
