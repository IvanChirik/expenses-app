'use client';

import { ChangeEvent, FC, WheelEvent, useEffect, useState } from 'react';
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
    const [wheelCard, setWheelCard] = useState<number>(0);
    const [filterParams, setFilterParams] = useState<string>('');
    const { saveTransactionData, transactionPeriod } = useTransactionState();
    const { data, isSuccess } = useQuery({
        queryKey: ['transactions', filterParams, transactionPeriod],
        queryFn: () => transactionService.findAll(transactionPeriod, filterParams),
        retry: false
    });
    const lastPage = data && Math.ceil(data?.length / 5);
    const wheelDirection = (e: WheelEvent<HTMLDivElement>) => {
        if (data && e.deltaY > 0 && transactionPage == Math.ceil(data?.length / 5))
            return
        if (e.deltaY > 0) {
            setWheelCard(transactionPage + 1);
            return;
        }
        if (e.deltaY < 0) {
            setWheelCard(transactionPage - 1);
            return;
        }
    };
    const changeFilterParams = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterParams(e.target.value);
    };
    useEffect(() => {
        if (lastPage && lastPage < transactionPage)
            setTransactionPage(1);
    }, [lastPage])
    useEffect(() => {
        if (isSuccess && data && !filterParams) {
            saveTransactionData(data);
        }
    }, [isSuccess, data]);
    useEffect(() => {
        const wheelTimer = setTimeout(() => {
            if (wheelCard > transactionPage) {
                setTransactionPage(prev => prev + 1);
            }
            if (wheelCard < transactionPage && transactionPage > 1) {
                setTransactionPage(prev => prev - 1);
            }
        }, 500);
        return () => {
            clearTimeout(wheelTimer)
        }
    }, [wheelCard]);
    return (
        <Card onWheel={wheelDirection} className={cn(className, styles['transaction-wrapper'])} {...props}>
            <div className={styles['card-header']}>
                <div className={styles['input-wrapper']}>
                    <Input
                        className={styles.input}
                        placeholder='Найти по описанию или категории...'
                        value={filterParams}
                        onChange={changeFilterParams}
                    />
                    <FiSearch className={styles['search-icon']} />
                </div>
                {data && data?.length > 5 && <div className={styles.pagination}>
                    <button
                        disabled={transactionPage === 1}
                        className={styles.arrow}
                        onClick={() => setTransactionPage(prev => prev - 1)}>
                        <MdKeyboardDoubleArrowLeft />
                    </button>
                    {transactionPage}
                    <BsThreeDots className={styles.dots} />
                    {Math.ceil(data?.length / 5)}
                    <button className={styles.arrow}
                        disabled={transactionPage === Math.ceil(data?.length / 5)}
                        onClick={() => setTransactionPage(prev => prev + 1)}>
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>}
            </div>
            {data && data.slice(transactionPage * 5 - 5, transactionPage * 5).map((t: ITransactionData) =>
                <TransactionItem
                    transactionPage={transactionPage}
                    transaction={t}
                    key={t.id} />)}
            {!data && <div className={styles['empty-list']}>{`Нет найдено записей ${filterParams ? `по фильтру - ${filterParams}.` : 'о расходах и доходах.'}`}</div>}
        </Card >
    );
};

export default TransactionsCard;