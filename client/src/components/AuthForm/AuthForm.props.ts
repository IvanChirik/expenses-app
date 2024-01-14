import { FormHTMLAttributes, HTMLInputTypeAttribute } from "react";

export interface IInputBlock {
    id: string;
    label: string;
    type: HTMLInputTypeAttribute
}

export interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
    title: string;
    inputBlock?: IInputBlock[];
    buttonName: 'Войти' | 'Зарегестрироваться'
}