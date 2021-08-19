export const TOKEN_KEY = "@sgtcc-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const signIn = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const signOut = () => {
  localStorage.removeItem(TOKEN_KEY);
};