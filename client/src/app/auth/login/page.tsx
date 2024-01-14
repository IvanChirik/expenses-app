import AuthForm from '@/components/AuthForm/AuthForm';
import Link from 'next/link';


const LoginPage = () => {
    return <AuthForm
        title='Вход'
        buttonName='Войти' >
        <span>Нет аккаунта?</span>
        <Link href='/auth/registration'>Зарегестрироваться</Link>
    </AuthForm>
};

export default LoginPage;