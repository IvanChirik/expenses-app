'use client';

import { FC } from 'react';
import Card from '../../UI/Card/Card';
import styles from './TransactionsCard.module.css';
import { ITransactionsCard } from './TransactionsCard.props';
import cn from 'classnames';
import TransactionItem from '@/components/TransactionItem/TransactionItem';
import { ITransactionItem } from '@/components/TransactionItem/TransactionItem.props';
import Input from '@/components/UI/Input/Input';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";


const TRANSACTION_LIST: ITransactionItem[] = [
    {
        id: Math.random().toString(),
        title: 'ref',
        type: 'income',
        amount: 1000,
        category: 'Salary',
        createdAt: new Date(),
    },
    {
        id: Math.random().toString(),
        title: 'reghfgf',
        type: 'expense',
        amount: 100,
        category: 'Groceries',
        createdAt: new Date(),
    },
    {
        id: Math.random().toString(),
        title: 'gfjhfgref',
        type: 'income',
        amount: 3000,
        category: 'Salary',
        createdAt: new Date(),
    },
    {
        id: Math.random().toString(),
        title: 'ref',
        type: 'income',
        amount: 3200,
        category: 'Salary',
        createdAt: new Date(),
    },
    {
        id: Math.random().toString(),
        title: 'gfdg bdfgdg ffdgdfg  dtyhh dt tdhdt thth  thhrt h rth ',
        type: 'expense',
        amount: 1,
        category: 'Groceries',
        createdAt: new Date(),
    },
]

const TransactionsCard: FC<ITransactionsCard> = ({ className, ...props }) => {
    return (
        <Card onWheel={() => console.log('wheel')} className={cn(className, styles['transaction-wrapper'])} {...props}>
            <div className={styles['card-header']}>
                <div className={styles['input-wrapper']}>
                    <Input className={styles.input} placeholder='Найти по описанию или категории...' />
                    <FiSearch className={styles['search-icon']} />
                </div>
                <div className={styles.pagination}>
                    <button className={styles.arrow}><MdKeyboardDoubleArrowLeft /></button>
                    1  <BsThreeDots className={styles.dots} /> 20
                    <button className={styles.arrow}><MdKeyboardDoubleArrowRight /></button>
                </div>
            </div>
            {TRANSACTION_LIST.map(item => <TransactionItem key={item.id} {...item} />)}
        </Card >
    );
};

export default TransactionsCard;