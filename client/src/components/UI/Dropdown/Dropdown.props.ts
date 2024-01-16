import { HTMLAttributes, SelectHTMLAttributes } from "react";


export interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
    options: string | string[];
}