import { API_URL } from "@/helpers/api";
import { $api } from "@/http";
import { IUserAuth } from "@/interfaces/user.interface"
import { AxiosError } from "axios"

class userService {

    async registration(email: string, password: string, name: string) {
        try {
            const { data: user } = await $api.post<IUserAuth>('/user', { email, password, name });
            console.log(user);
            return user;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }

    async login(email: string, password: string) {
        try {
            const { data: user } = await $api.post<IUserAuth>('/auth/login', { email, password });
            return user;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data.message);
            }
        }
    }
}
export default new userService();