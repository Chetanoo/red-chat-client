export interface registerDataInterface{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    confirmEmail: string;
    rememberMe: boolean;
}

export interface loginDataInterface{
    email: string;
    password: string;
    rememberMe: boolean;
}
