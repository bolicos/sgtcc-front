import TOKEN from "#/helpers/Token/index";
import { UserPrincipal } from "#/models/model/user";

const TOKEN_KEY = "token";
const TOKEN_SECRET = "auth-api";

export const AUTH = {
  IS_VALID: (token: string) => {
    return TOKEN.IS_VALID(token, TOKEN_SECRET);
  },
  SIGNIN: (token: string) => {
    TOKEN.SAVE(TOKEN_KEY, token);
  },

  SIGNOUT: () => {
    TOKEN.REMOVE(TOKEN_KEY);
  },
  IS_AUTHENTICATE: () => {
    const token = TOKEN.DECODE(TOKEN_KEY, TOKEN_SECRET);

    if (!!token) {
      const expiration = new Date(Number((token as any).exp * 1000));
      const now = new Date();

      return expiration > now;
    } else return false;
  },
  USER_PRINCIPAL: () => {
    const token = TOKEN.DECODE(TOKEN_KEY, TOKEN_SECRET);

    return !!token
      ? ({
          name: "Student",
          username: (token as any)?.username,
          roles: (token as any)?.roles,
        } as UserPrincipal)
      : undefined;
  },
};
