'use client';

import React, { FC, PropsWithChildren } from 'react';
import HTag from '../UI/HTag/HTag';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { AuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validateName, validatePassword } from '@/helpers/validateLoginAndRegister';
import { useAuth } from '@/hooks/useAuth';
import Toastify from '../UI/Toastify/Toastify';

export interface IFormData {
    email: string;
    password: string;
    name?: string;
}

const AuthForm: FC<PropsWithChildren<AuthFormProps>> = ({ children, className, title, registration = false, buttonName, ...props }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();
    const { mutate } = useAuth(registration);
    const submit: SubmitHandler<IFormData> = (data) => {
        if (registration)
            mutate({ email: data.email, password: data.password, name: data.name });
        else
            mutate({ email: data.email, password: data.password });
    }


    return <form className={cn(styles.form, className)} {...props} onSubmit={handleSubmit(submit)}>
        <HTag size='big' className={styles.title}>{title}</HTag>
        <div className={styles['input-wrapper']}>
            <Label htmlFor='email'>Email</Label>
            <Input
                id='email'
                placeholder='Введите свой email'
                type='email'
                {...register('email', { required: true, validate: value => validateEmail(value) })}
            />
            <div className={styles.error}
                hidden={errors.email ? false : true}>
                Проверьте правильность введённого email
            </div>
        </div>
        <div className={styles['input-wrapper']}>
            <Label htmlFor='password'>Пароль</Label>
            <Input
                id='password'
                placeholder='Введите свой пароль'
                type='password'
                {...register('password', { required: true, validate: value => validatePassword(value) })}
            />
            <div className={styles.error}
                hidden={errors.password ? false : true}>
                Проверьте правильность введённого пароля
            </div>
        </div>
        {registration && <div className={styles['input-wrapper']}>
            <Label htmlFor='name'>Имя</Label>
            <Input
                id='name'
                placeholder='Введите имя'
                {...register('name', { required: true, validate: value => value && validateName(value) })}
            />
        </div>}
        <Button className={styles.button}>{buttonName}</Button>
        <div className={styles['footer-block']}>
            {children}
        </div>
        <Toastify />
    </form>
};

export default AuthForm;