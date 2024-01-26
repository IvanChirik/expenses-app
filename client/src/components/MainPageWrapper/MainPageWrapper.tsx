'use client';

import { FC } from 'react';
import GraphCard from '../Cards/GraphCard/GraphCard';
import ProfileCard from '../Cards/ProfileCard/ProfileCard';
import TransactionsCard from '../Cards/TransactionsCard/TransactionsCard';
import styles from './MainPageWrapper.module.css';



const MainPageWrapper: FC = () => {

    return <>
        <ProfileCard className={styles.profile} />
        <div className={styles['content-block']} >
            <GraphCard className={styles.graph}></GraphCard>
            <TransactionsCard className={styles.transaction}></TransactionsCard>
        </div>
    </>
}
export default MainPageWrapper;