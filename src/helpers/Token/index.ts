import jwt from "jsonwebtoken";
import LocalStorage from "#/helpers/LocalStorage";

const TOKEN = {
  DECODE: (key: string, secret: string) => {
    const storagedToken = LocalStorage.GET(key);

    return !!storagedToken && TOKEN.IS_VALID(storagedToken, secret)
      ? jwt.decode(storagedToken, { json: true })
      : undefined;
  },
  SAVE: (key: string, value: string) => {
    LocalStorage.SAVE(key, value);
  },
  REMOVE: (key: string) => {
    LocalStorage.REMOVE(key);
  },
  IS_VALID: (token: string, secret: string) => {
    try {
      const tokenDecoded = jwt.decode(token, { json: true });
      return !!tokenDecoded ? true : false;
    } catch (error) {
      console.log("JWT is not valid!", error);
      return false;
    }
  },
};

export default TOKEN;
