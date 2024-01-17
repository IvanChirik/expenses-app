export interface IUserLogin {
    id: number;
    email: string;
    access_token: string;
}


export interface IUserRegister {
    user: Omit<IUserLogin, 'access_token'>;
    token: string;
}