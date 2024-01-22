'use client';

import { FC, useEffect } from 'react';
import GraphCard from '../Cards/GraphCard/GraphCard';
import ProfileCard from '../Cards/ProfileCard/ProfileCard';
import TransactionsCard from '../Cards/TransactionsCard/TransactionsCard';
import styles from './MainPageWrapper.module.css';
import { useQuery } from '@tanstack/react-query';
import transactionService from '@/services/transactionService';
import { useTransactionState } from '@/stores/transaction.store';

const MainPageWrapper: FC = () => {
    const { data, isSuccess } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => transactionService.findAll(),
    });
    const { saveTransactionData, setPaginationPageQuantity } = useTransactionState();
    useEffect(() => {
        if (isSuccess && data) {
            saveTransactionData(data);
            setPaginationPageQuantity(data.length / 5);
        }
    }, [isSuccess, data]);

    return <>
        <ProfileCard className={styles.profile} />
        <div className={styles['content-block']} >
            <GraphCard className={styles.graph}></GraphCard>
            <TransactionsCard className={styles.transaction}></TransactionsCard>
        </div>
    </>
}
export default MainPageWrapper;