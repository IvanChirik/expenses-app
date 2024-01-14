import { ButtonHTMLAttributes } from "react";


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fontSz?: 'lg' | 'sm'
}