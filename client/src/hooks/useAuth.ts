import { IFormData } from "@/components/AuthForm/AuthForm";
import userService from "@/services/userService";
import { useUserState } from "@/stores/user.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export const useAuth = (registration: boolean) => {
    const { push } = useRouter();
    const { saveUserData } = useUserState();
    return useMutation({
        mutationFn: async (userData: IFormData) => {
            if (registration && userData.name)
                return await userService.registration(userData.email, userData.password, userData.name);
            return await userService.login(userData.email, userData.password);
        },
        onSuccess(variable) {
            if (variable) {
                saveUserData(variable);
                localStorage.setItem('token', variable.access_token);
            }
            push('/');
            (() => toast.success(`${registration ? 'Добро пожаловать' : 'Рады видеть вас снова'} ${variable?.name}`))();
        },
        onError(variable) {
            (() => toast.error(variable.toString()))()
        },
    });
}