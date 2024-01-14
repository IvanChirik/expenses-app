import React, { FC, PropsWithChildren } from 'react';
import { ICardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';

const Card: FC<PropsWithChildren<ICardProps>> = ({ children, className, ...props }) => {
    return (
        <div className={cn(className, styles.card)} {...props}>
            {children}
        </div>
    );
};

export default Card;