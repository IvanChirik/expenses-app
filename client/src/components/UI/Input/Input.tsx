import { forwardRef } from "react";
import { InputProsps } from "./Input.props";
import styles from './Input.module.css';
import cn from 'classnames';


const Input = forwardRef<HTMLInputElement, InputProsps>(({ className, ...props }, ref) => {
    return <input {...props} ref={ref} className={cn(className, styles.input)} />
});

export default Input;