export type User = {
    username: string;
    password: string;
}

export type UserDetails = {
    name: string;
    email: string;
    password: string;
    type: UserType;
    roles: Array<UserRoles>;
}

export enum UserType {
    ADMINISTRATOR,
    STUDENT,
    TEACHER
}

export enum UserRoles {
    DEFAULT,
    ADVISOR,
    EVALUATOR,
    MASTER
}
