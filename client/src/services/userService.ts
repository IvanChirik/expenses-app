import { IUserRegister } from "@/interfaces/user.interface"
import axios from "axios"

class userService {
    private readonly USER_ENDPOINT = 'http://localhost:3000/api/user';


    async registration(email: string, password: string) {
        return await axios.post<IUserRegister>(`${this.USER_ENDPOINT}/registration`, { email, password });
    }

    async login(email: string, password: string) {
        return await axios.post<IUserRegister>(`${this.USER_ENDPOINT}/login`, { email, password });
    }
}