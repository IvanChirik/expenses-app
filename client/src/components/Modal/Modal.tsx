'use client';

import React, { FC, useState } from 'react';
import styles from './Modal.module.css';
import { IModal } from './Modal.props';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import { AiOutlineClose } from "react-icons/ai";
import CategoriesDropdown from '../UI/CategoriesDropdown/CategoriesDropdown';
import Button from '../UI/Button/Button';
import cn from 'classnames';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validateTransactionAmount, validateTransactionTitle } from '@/helpers/validate';
import transactionService from '@/services/transactionService';
import Toastify from '../UI/Toastify/Toastify';
import { toast } from 'react-toastify';
import { TransactionType } from '@/interfaces/transaction.interface';

interface ITransactionForm {
    title: string;
    amount: number;
}

const Modal: FC<IModal> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ITransactionForm>()
    const { data: categories, error, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.findAll(),
        // select: (categories) => categories?.map((category: ICategoryData) => category.title)
    });
    const queryClient = useQueryClient();
    const [categoryId, setCategoryId] = useState<number>(NaN);
    const [activeTransactionButton, setActiveTransactionButton] = useState<TransactionType>(TransactionType.Expense);
    const { mutate } = useMutation({
        mutationFn: ({ title, amount, id, type }: { title: string, amount: number, id: number, type: TransactionType }) => transactionService.createTransaction({ category: { id }, type, title, amount }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            reset();
            onClose();
            (() => toast.success('Транзакция успешно создана'))();
        },
        onError: (variable) => {
            (() => toast.error(variable.toString()))()
        }
    });


    const submit: SubmitHandler<ITransactionForm> = (data) => {
        mutate({ title: data.title, amount: +data.amount, id: categoryId, type: activeTransactionButton });
    }

    return <>
        {isOpen && <div className={styles['modal-overlay']}>
            <Card className={styles['modal-content']}>
                <form className={styles.form} onSubmit={handleSubmit(submit)}>
                    <div className={styles['dropdown-section']}>
                        <div className={styles['transaction-block']}>
                            <Label>Тип транзакции</Label>
                            <div className={styles['button-block']}>
                                <button
                                    type='button'
                                    onClick={() => setActiveTransactionButton(TransactionType.Income)}
                                    className={cn(styles['transaction-type-button'],
                                        styles['income-type'], {
                                        [styles['income-active']]: activeTransactionButton === TransactionType.Income
                                    })}>Доход</button>
                                <button
                                    type='button'
                                    onClick={() => setActiveTransactionButton(TransactionType.Expense)}
                                    className={cn(styles['transaction-type-button'],
                                        styles['expense-type'], {
                                        [styles['expense-active']]: activeTransactionButton === TransactionType.Expense
                                    })}>Расход</button>
                            </div>
                        </div>
                        <div className={styles.categories}>
                            <Label>Категория</Label>
                            {categories && <CategoriesDropdown onSelectId={(id) => setCategoryId(id)} options={categories} />}
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
                    <Button className={styles['form-button']}>Добавить</Button>
                </form>
                <button className={styles['close-button']} onClick={() => onClose()}><AiOutlineClose /></button>
            </Card>
            <Toastify />
        </div >}
    </>
};

export default Modal;