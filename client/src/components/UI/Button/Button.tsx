import React, { FC, PropsWithChildren } from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, className, fontSz = 'sm', ...props }) => {
    return <button className={cn(styles.button, className, {
        [styles.upper]: fontSz == 'lg'
    })} {...props}>{children}</button>
};

export default Button;  