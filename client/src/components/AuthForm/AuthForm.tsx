'use client';

import React, { FC, PropsWithChildren } from 'react';
import HTag from '../UI/HTag/HTag';
import Label from '../UI/Label/Label';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { AuthFormProps } from './AuthForm.props';
import styles from './AuthForm.module.css';
import cn from 'classnames';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/helpers/validateLoginAndRegister';
import { useQuery } from 'react-query';
import axios from 'axios';

interface IFormData {
    email: string;
    password: string;
}

const AuthForm: FC<PropsWithChildren<AuthFormProps>> = ({ children, className, title, inputBlock, buttonName, ...props }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>()
    const submit: SubmitHandler<IFormData> = (data) => {
        console.log(data);
    }
    const error: SubmitErrorHandler<IFormData> = (data) => {
        console.log(data);
    }
    return <form className={cn(styles.form, className)} {...props} onSubmit={handleSubmit(submit, error)}>
        <HTag size='big' className={styles.title}>{title}</HTag>
        <div>
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
        <div>
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