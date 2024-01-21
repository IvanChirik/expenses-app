import { ICategoryData } from "@/interfaces/category.interface";
import { HTMLAttributes, SelectHTMLAttributes } from "react";


export interface IDropdownProps extends HTMLAttributes<HTMLDivElement> {
    options: ICategoryData[];
    onSelectId: (id: number) => void;
}