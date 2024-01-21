'use client';

import React, { FC, useState } from 'react';
import styles from './Modal.module.css';
import { IModal } from './Modal.props';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import { AiOutlineClose } from "react-icons/ai";
import Dropdown from '../UI/CategoriesDropdown/CategoriesDropdown';
import Button from '../UI/Button/Button';
import cn from 'classnames';
import { useMutation, useQuery } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validateTransactionAmount, validateTransactionTitle } from '@/helpers/validate';
import transactionService from '@/services/transactionService';
import Toastify from '../UI/Toastify/Toastify';
import { toast } from 'react-toastify';

interface ITransactionForm {
    title: string;
    amount: number;
}

const Modal: FC<IModal> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ITransactionForm>()
    const { data: categories, error, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.findAll(),
        // select: (categories) => categories?.map((category: ICategoryData) => category.title)
    });

    const [categoryId, setCategoryId] = useState<number>(NaN);
    const [activeTransactionButton, setActiveTransactionButton] = useState<'income' | 'expense'>('expense');
    const { mutate } = useMutation({
        mutationFn: ({ title, amount, id, type }: { title: string, amount: number, id: number, type: 'income' | 'expense' }) => transactionService.createTransaction({ category: { id }, type, title, amount }),
        onSuccess: () => {
            onClose();
            (() => toast.success('Транзакция успешно создана'));
        },
        onError: (variable) => {
            (() => toast.error(variable.toString()))()
        }
    });


    const submit: SubmitHandler<ITransactionForm> = (data) => {
        mutate({ title: data.title, amount: data.amount, id: categoryId, type: activeTransactionButton });
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
                                    onClick={() => setActiveTransactionButton('income')}
                                    className={cn(styles['transaction-type-button'],
                                        styles['income-type'], {
                                        [styles['income-active']]: activeTransactionButton === 'income'
                                    })}>Доход</button>
                                <button
                                    type='button'
                                    onClick={() => setActiveTransactionButton('expense')}
                                    className={cn(styles['transaction-type-button'],
                                        styles['expense-type'], {
                                        [styles['expense-active']]: activeTransactionButton === 'expense'
                                    })}>Расход</button>
                            </div>
                        </div>
                        <div>
                            <Label>Категория</Label>
                            {categories && <Dropdown onSelectId={(id) => setCategoryId(id)} options={categories} />}
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