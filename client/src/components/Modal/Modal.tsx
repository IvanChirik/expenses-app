'use client';

import { FC } from 'react';
import styles from './Modal.module.css';
import { IModal } from './Modal.props';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import { AiOutlineClose } from "react-icons/ai";
import CategoriesDropdown from '../UI/CategoriesDropdown/CategoriesDropdown';
import Button from '../UI/Button/Button';
import cn from 'classnames';
import { validateTransactionAmount, validateTransactionTitle } from '@/helpers/validate';
import Toastify from '../UI/Toastify/Toastify';
import { TransactionType } from '@/interfaces/transaction.interface';
import { useTransactionModal } from '@/hooks/useTransactionModal';



const Modal: FC<IModal> = ({ isOpen, onClose }) => {
    const { formContol: { sumbitHandler,
        errors,
        register },
        typeButton: {
            transactionType,
            setTransactionType
        },
        categoryState: {
            categories,
            setCategoryId
        },
        currentEditTransaction,
    } = useTransactionModal(onClose);

    return <>
        {isOpen && <div className={styles['modal-overlay']}>
            <Card className={styles['modal-content']}>
                <form className={styles.form} onSubmit={sumbitHandler}>
                    <div className={styles['dropdown-section']}>
                        <div className={styles['transaction-block']}>
                            <Label>Тип транзакции</Label>
                            <div className={styles['button-block']}>
                                <button
                                    type='button'
                                    onClick={() => setTransactionType(TransactionType.Income)}
                                    className={cn(styles['transaction-type-button'],
                                        styles['income-type'], {
                                        [styles['income-active']]: transactionType === TransactionType.Income
                                    })}>Доход</button>
                                <button
                                    type='button'
                                    onClick={() => setTransactionType(TransactionType.Expense)}
                                    className={cn(styles['transaction-type-button'],
                                        styles['expense-type'], {
                                        [styles['expense-active']]: transactionType === TransactionType.Expense
                                    })}>Расход</button>
                            </div>
                        </div>
                        <div className={styles.categories}>
                            <Label>Категория</Label>
                            {categories && <CategoriesDropdown
                                onSelectId={(id) => setCategoryId(id)}
                                defaultCategory={currentEditTransaction?.category.title}
                                options={categories} />}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor='title'>Описание</Label>
                        <Input id='title'
                            placeholder='Описание расхода'
                            {...register('title', { required: true, validate: value => validateTransactionTitle(value) })} />
                        <div className={styles.error}
                            hidden={errors.title ? false : true}>
                            Введите описание
                        </div>
                    </div>
                    <div>
                        <Label htmlFor='amount'>Сумма</Label>
                        <Input id='amount'
                            placeholder='Введите потрченную полусенную сумму'
                            type='number'
                            className={styles['number-input']}
                            {...register('amount', { required: true, validate: value => validateTransactionAmount(value) })} />
                        <div className={styles.error}
                            hidden={errors.amount ? false : true}>
                            Сумма не может быть меньше нуля
                        </div>
                    </div>
                    <Button className={styles['form-button']}>{currentEditTransaction ? 'Обновить' : 'Добавить'}</Button>
                </form>
                <button className={styles['close-button']} onClick={() => onClose()}><AiOutlineClose /></button>
            </Card>
            <Toastify />
        </div >}
    </>
};

export default Modal;