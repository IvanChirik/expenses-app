'use client';

import { FC, useEffect, useState } from 'react';
import Card from '../../UI/Card/Card';
import styles from './TransactionsCard.module.css';
import { ITransactionsCard } from './TransactionsCard.props';
import cn from 'classnames';
import TransactionItem from '@/components/TransactionItem/TransactionItem';
import Input from '@/components/UI/Input/Input';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useQuery } from '@tanstack/react-query';
import transactionService from '@/services/transactionService';
import { ITransactionData } from '@/interfaces/transaction.interface';
import { useTransactionState } from '@/stores/transaction.store';



const TransactionsCard: FC<ITransactionsCard> = ({ className, ...props }) => {
    const [transactionPage, setTransactionPage] = useState<number>(1);
    const { data, error, isError } = useQuery({
        queryKey: ['transactions', transactionPage],
        queryFn: () => transactionService.findWithPagination(transactionPage),
        retry: false
    });
    const { pageQuantity } = useTransactionState();
    useEffect(() => {
        if (pageQuantity < transactionPage && pageQuantity !== 0) {
            setTransactionPage(prev => prev - 1);
        }
    }, [pageQuantity, isError, error])
    return (
        <Card onWheel={() => console.log('wheel')} className={cn(className, styles['transaction-wrapper'])} {...props}>
            {!isError && <><div className={styles['card-header']}>
                <div className={styles['input-wrapper']}>
                    <Input className={styles.input} placeholder='Найти по описанию или категории...' />
                    <FiSearch className={styles['search-icon']} />
                </div>
                <div className={styles.pagination}>
                    <button
                        disabled={transactionPage === 1}
                        className={styles.arrow}
                        onClick={() => setTransactionPage(prev => prev - 1)}>
                        <MdKeyboardDoubleArrowLeft />
                    </button>
                    {transactionPage}
                    <BsThreeDots className={styles.dots} />
                    {pageQuantity}
                    <button className={styles.arrow}
                        disabled={transactionPage === pageQuantity}
                        onClick={() => setTransactionPage(prev => prev + 1)}>
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            </div>
                {data && data.map((t: ITransactionData) => <TransactionItem transactionPage={transactionPage} transaction={t} key={t.id} />)}</>}
            {isError && <div>Пока что нет записей о расходах  и доходах</div>}
        </Card >
    );
};

export default TransactionsCard;