import { FC } from "react";
import Card from "../../UI/Card/Card";
import styles from './ProfileCard.module.css';
import cn from 'classnames';
import { IProfileCard } from "./ProfileCard.props";

const ProfileCard: FC<IProfileCard> = ({ className, ...props }) => {
    return (
        <Card className={cn(className, styles['profile-card'])} {...props}>
            <div className={styles['profile-photo']}>Photo</div>
            <div className={styles['profile-name']}>Ivan</div>
            <div className={styles['profile-email']}>Ivancherviakovskiy</div>
            <div>Доход за период 1000</div>
            <div>Расход за период 1000</div>
        </Card >
    );
};

export default ProfileCard;