import React, { FC } from 'react';
import styles from './Modal.module.css';
import { IModal } from './Modal.props';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';

const Modal: FC<IModal> = ({ isOpen, onClose }) => {
    return <>
        {isOpen && <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <form>
                    <Label htmlFor='title'>Описание</Label>
                    <Input id='title' placeholder='Описание расхода' />
                    <Label htmlFor='amount'>Сумма</Label>
                    <Input id='amount' placeholder='Введите потрченную полусенную сумму' type='number' inputMode='numeric' />

                </form>
                <button className={styles.close} onClick={() => onClose()}>&times;</button>
                <p>Содержимое модального окна здесь</p>
            </div>
        </div>}
        <div></div></>
};

export default Modal;