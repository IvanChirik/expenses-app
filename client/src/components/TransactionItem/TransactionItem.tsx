import { FC, useState } from 'react';
import { ITransactionItem } from './TransactionItem.props';
import styles from './TransactionItem.module.css';
import cn from 'classnames';
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { TransactionType } from '@/interfaces/transaction.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import transactionService from '@/services/transactionService';
import { toast } from 'react-toastify';
import Modal from '../Modal/Modal';
import { useTransactionState } from '@/stores/transaction.store';
import { formatDate } from '@/helpers/dataFormater';


const TransactionItem: FC<ITransactionItem> = ({ className, transactionPage, transaction, ...props }) => {
    const { id, title, amount, category, type, createdAt } = transaction;
    const [isModalHidden, setIsModalHidden] = useState<boolean>(true);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id: number) => transactionService.deleteTransaction(id),
        onSuccess: () => {
            (() => toast.success('Транзакция удалена'));
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        }
    });
    const { setCurrentEditTransaction } = useTransactionState();
    const closeModalWindow = () => {
        setIsModalHidden(true);
        setCurrentEditTransaction(undefined);
    }
    const editItem = () => {
        setIsModalHidden(false);
        setCurrentEditTransaction(transaction);
    }
    const deleteItem = () => {
        mutate(id);
    }
    return (
        <>
            <div className={cn(className, styles.transaction, {
                [styles['income-border']]: type === TransactionType.Income,
                [styles['expense-border']]: type === TransactionType.Expense,
            })} {...props}>
                <div className={styles.title}>
                    <div className={styles['hidden-title']}>{title}</div>
                    <div className={styles.tooltip}>{title}</div>
                </div>
                <div className={styles.amount}>{amount}</div>
                <div className={styles.type}>{category.title}</div>
                <div className={styles.date}>{formatDate(createdAt)}</div>
                <div className={styles.actions}>
                    <button onClick={editItem}><FiEdit3 /></button>
                    <button onClick={deleteItem}><FaTrash /></button>
                </div>
            </div>
            {!isModalHidden && <Modal isOpen={!isModalHidden} onClose={closeModalWindow} />}
        </>
    );
};

export default TransactionItem;

