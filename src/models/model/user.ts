export type JwtTokenDecoded = {
  roles: Array<Roles>;
  username: string;
  exp: number;
  iat: number;
  sub: string;
};

export type UserPrincipal = {
  username: string;
  name: string;
  roles: Array<Roles>;
};

export type Roles = {
  name: string;
  authority: string;
};
