import jwtDecode from "jwt-decode";
import LocalStorage from "#/helpers/LocalStorage";

const Token = {
  DECODE: (name: string, value: string) => {
    const storagedToken = LocalStorage.GET("token");
    return !!storagedToken ? jwtDecode<string>(storagedToken) : undefined;
  },
};

export default Token;
