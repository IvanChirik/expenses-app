
import { ITransactionData } from "@/interfaces/transaction.interface";
import { create } from "zustand";



export interface TransactionState {
    transactions: ITransactionData[];
    saveCategoryData: (transactions: ITransactionData[]) => void
}


export const useTransactionState = create<TransactionState>((set) => ({
    transactions: [],
    saveCategoryData: (transactions) => set(() => ({ transactions: transactions }))
}))