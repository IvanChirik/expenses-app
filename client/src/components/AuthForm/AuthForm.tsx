import React, { FC, PropsWithChildren } from 'react';
import HTag from '../UI/HTag/HTag';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { AuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import cn from 'classnames';

const AuthForm: FC<PropsWithChildren<AuthFormProps>> = ({ children, className, title, inputBlock, buttonName, ...props }) => {
    return <form className={cn(styles.form, className)} {...props}>
        <HTag size='big' className={styles.title}>{title}</HTag>
        <Label htmlFor='email'>Email</Label>
        <Input
            id='email'
            placeholder='Введите свой email'
            type='email'
        />
        <Label htmlFor='password'>Пароль</Label>
        <Input
            id='password'
            placeholder='Введите свой пароль'
            type='password'
        />
        {inputBlock?.map(i => <div key={i.id} className={styles['input-wrapper']}>
            <Label htmlFor={i.id}>{i.label}</Label>
            <Input
                id={i.id}
                type={i.type}
                placeholder={`Введите свой ${i.label.toLowerCase()}`}
            />
        </div>)}
        <Button className={styles.button}>{buttonName}</Button>
        <div className={styles['footer-block']}>
            {children}
        </div>
    </form>
};

export default AuthForm;