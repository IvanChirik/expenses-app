'use client';

import React, { FC, FormEvent, MouseEvent, useState } from 'react';
import styles from './Modal.module.css';
import { IModal } from './Modal.props';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import { AiOutlineClose } from "react-icons/ai";
import Dropdown from '../UI/Dropdown/Dropdown';
import Button from '../UI/Button/Button';
import cn from 'classnames';

const Modal: FC<IModal> = ({ isOpen, onClose, dropdownType }) => {

    const [activeTransactionButton, setActiveTransactionButton] = useState<'income' | 'expense'>('expense');

    return <>
        {isOpen && <div className={styles['modal-overlay']}>
            <Card className={styles['modal-content']}>
                <form className={styles.form}>
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
                            <Dropdown options={['Продукты', 'Дом', 'Питомцы', 'Транспорт']} />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor='title'>Описание</Label>
                        <Input id='title' placeholder='Описание расхода' />
                    </div>
                    <div>
                        <Label htmlFor='amount'>Сумма</Label>
                        <Input id='amount'
                            placeholder='Введите потрченную полусенную сумму'
                            type='number'
                            className={styles['number-input']} />
                    </div>
                    <Button className={styles['form-button']}>Добавить</Button>
                </form>
                <button className={styles['close-button']} onClick={() => onClose()}><AiOutlineClose /></button>
            </Card>
        </div >}
        <div></div></>
};

export default Modal;