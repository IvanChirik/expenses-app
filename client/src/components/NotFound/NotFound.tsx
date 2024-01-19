'use client';

import Image from 'next/image';
import React, { FC } from 'react';
import styles from './NotFound.module.css';
import Button from '../UI/Button/Button';
import { NotFoundProps } from './NotFound.props';
import { useRouter } from 'next/navigation';
import { IoHome } from "react-icons/io5";

const NotFound: FC<NotFoundProps> = () => {
    const { replace } = useRouter();
    return (
        <div className={styles.wrapper}>
            <Image src='/not-found.png' width={820} height={390} alt="Not found picture" priority />
            <Button onClick={() => replace('/')}><IoHome className={styles.button} />&nbsp;На главную</Button>
        </div>
    );
};

export default NotFound;