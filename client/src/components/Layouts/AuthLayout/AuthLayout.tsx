import { FC, PropsWithChildren } from 'react';
import styles from './AuthLayout.module.css';
import { AuthLayoutProps } from './AuthLayout.props';
import Image from 'next/image';

const AuthLayout: FC<PropsWithChildren<AuthLayoutProps>> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{children}</div>
            <div className={styles.logo}>
                <Image className={styles.image} src='/auth-logo.png' width={412} height={303} alt='Auth logo picture' priority />
            </div>
        </div>
    );
};

export default AuthLayout;