'use client';

import { FC, useState } from "react";
import Card from "../../UI/Card/Card";
import styles from './ProfileCard.module.css';
import cn from 'classnames';
import { IProfileCard } from "./ProfileCard.props";
import { VscAccount } from 'react-icons/vsc';
import { VscAdd } from "react-icons/vsc";
import Button from "@/components/UI/Button/Button";
import Modal from "@/components/Modal/Modal";
import { useUserState } from "@/stores/user.store";
import { amountFormater } from "@/helpers/amountFormater";


const ProfileCard: FC<IProfileCard> = ({ className, ...props }) => {
    const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
    const { userProfile } = useUserState.getState();
    const openModalWindow = () => {
        setIsModalHidden(false)
    }

    const closeModalWindow = () => {
        setIsModalHidden(true);
    }
    return (
        <>
            <Card className={cn(className, styles['profile-card'])} {...props}>
                <div className={styles['profile-info']}>
                    <div className={styles['profile-photo']}><VscAccount style={{ fontSize: '50px' }} /></div>
                    <div className={styles['profile-name']}>{userProfile?.name}</div>
                    <div className={styles['profile-email']}>{userProfile?.email}</div>
                </div>
                <Button onClick={openModalWindow} className={styles['add-button']}><VscAdd style={{ fontSize: '25px' }} />Добавить запись</Button>
                <select className={styles.select}>
                    <option value='year'>За год</option>
                    <option value='month'>За месяц</option>
                    <option value='week'>За неделю</option>
                </select>
                <div className={styles['info-wrapper']}>
                    <div className={styles['income']}><span>Доход за период:</span> {amountFormater(2000)}</div>
                    <div className={styles['expense']}><span>Расход за период:</span> {amountFormater(1000)}</div>
                </div>
            </Card >
            {!isModalHidden && <Modal isOpen={!isModalHidden} onClose={closeModalWindow} />}
        </>
    );
};

export default ProfileCard;