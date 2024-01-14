import React, { FC, PropsWithChildren } from 'react';
import { HTagProps } from './HTag.props';
import styles from './HTag.module.css';
import cn from 'classnames';

const HTag: FC<PropsWithChildren<HTagProps>> = ({ children, size = 'medium', className, ...props }) => {
    switch (size) {
        case 'small':
            return <h3 className={cn(className, styles.h3)} {...props}>{children}</h3>
        case 'medium':
            return <h2 className={cn(className, styles.h2)} {...props}>{children}</h2>
        case 'big':
            return <h1 className={cn(className, styles.h1)} {...props}>{children}</h1>
    }
};

export default HTag;