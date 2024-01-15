import { FC } from 'react';
import { ITransactionItem } from './TransactionItem.props';
import styles from './TransactionItem.module.css';
import cn from 'classnames';
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";


const TransactionItem: FC<ITransactionItem> = ({ className, amount, id, title, type, category, createdAt, ...props }) => {
    return (
        <div className={cn(className, styles.transaction, {
            [styles['income-border']]: type === 'income',
            [styles['expense-border']]: type === 'expense',
        })} {...props}>
            <div className={styles.title}>
                <div className={styles['hidden-title']}>{title}</div>
                <div className={styles.tooltip}>{title}</div>
            </div>
            <div className={styles.amount}>{amount}</div>
            <div className={styles.type}>{category}</div>
            <div className={styles.date}>{createdAt?.toDateString()}</div>
            <div className={styles.actions}>
                <button><FiEdit3 /></button>
                <button><FaTrash /></button>
            </div>
        </div>
    );
};

export default TransactionItem;