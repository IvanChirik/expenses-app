import { IUserAuth } from "@/interfaces/user.interface";
import { create } from "zustand";



export interface UserState {
    userProfile?: Omit<IUserAuth, 'access_token'>;
    token: string | null;
    saveUserData: (user: IUserAuth) => void;
    deleteUserData: () => void;
};


export const useUserState = create<UserState>((set) => ({
    userProfile: undefined,
    token: null,
    saveUserData: (user) => set(() => ({ userProfile: { ...user }, token: user.access_token })),
    deleteUserData: () => set(() => ({ userProfile: undefined, token: null }))
}))