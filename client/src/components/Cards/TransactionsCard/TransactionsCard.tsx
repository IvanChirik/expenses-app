'use client';

import { FC } from 'react';
import Card from '../../UI/Card/Card';
import styles from './TransactionsCard.module.css';
import { ITransactionsCard } from './TransactionsCard.props';
import cn from 'classnames';

const TransactionsCard: FC<ITransactionsCard> = ({ className, ...props }) => {
    return (
        <Card onWheel={() => console.log('wheel')} className={cn(className, styles['transaction-wrapper'])} {...props}> Transaction </Card >
    );
};

export default TransactionsCard;