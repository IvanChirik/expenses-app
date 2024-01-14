import { HTMLAttributes } from "react";


export interface HTagProps extends HTMLAttributes<HTMLHeadElement> {
    size?: 'small' | 'medium' | 'big'
}