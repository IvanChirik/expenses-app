import AuthForm from '@/components/AuthForm/AuthForm';
import Link from 'next/link';
import React from 'react';

const RegistrationPage = () => {
    return <AuthForm
        title='Регистрация'
        inputBlock={[{ id: 'name', label: 'Имя', type: 'text' },]}
        buttonName='Зарегестрироваться' >
        <span>Уже есть аккаунт?</span>
        <Link href='/auth/login'>Войти</Link>
    </AuthForm>
};

export default RegistrationPage;