import React, { FC } from 'react';
import styles from './Modal.module.css';
import { IModal } from './Modal.props';

const Modal: FC<IModal> = ({ isOpen, onClose }) => {
    return <>
        {isOpen && <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <button className={styles.close} onClick={() => onClose()}>&times;</button>
                <p>Содержимое модального окна здесь</p>
            </div>
        </div>}
        <div></div></>
};

export default Modal;