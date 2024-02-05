'use client';

import { FC, useEffect } from 'react';
import GraphCard from '../Cards/GraphCard/GraphCard';
import ProfileCard from '../Cards/ProfileCard/ProfileCard';
import TransactionsCard from '../Cards/TransactionsCard/TransactionsCard';
import styles from './MainPageWrapper.module.css';
import Toastify from '../UI/Toastify/Toastify';
import { toast } from 'react-toastify';
import { useTransactionState } from '@/stores/transaction.store';



const MainPageWrapper: FC = () => {
    // const { transactions } = useTransactionState();
    // useEffect(() => {
    //     setTimeout(() => {
    //         console.log('Edit');
    //         (() => toast.error('Изменение'))()
    //     }, 0)
    // }, [transactions]);
    return <>
        <ProfileCard className={styles.profile} />
        <div className={styles['content-block']} >
            <GraphCard className={styles.graph}></GraphCard>
            <TransactionsCard className={styles.transaction}></TransactionsCard>
        </div>
        <Toastify />
    </>
}
export default MainPageWrapper;