import { API_URL } from "@/helpers/api";
import { IUserAuth } from "@/interfaces/user.interface"
import axios, { AxiosError } from "axios"

class userService {
    private readonly USER_ENDPOINT = `${API_URL}`;


    async registration(email: string, password: string, name: string) {
        try {
            const { data: user } = await axios.post<IUserAuth>(`${this.USER_ENDPOINT}/user`, { email, password, name });
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
            const { data: user } = await axios.post<IUserAuth>(`${this.USER_ENDPOINT}/auth/login`, { email, password });
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