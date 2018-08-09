export interface IUser {
    authenticated: boolean;
    admin:boolean;
    id:number;
    email: string;
    exp: number;
    iat: number;
    username: string;
}

export interface IUserContext {
    user:IUser;
    newUser: () => void;
    logout: () => void;
}