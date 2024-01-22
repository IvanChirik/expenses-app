
import { ITransactionData } from "@/interfaces/transaction.interface";
import { create } from "zustand";



export interface TransactionState {
    transactions: ITransactionData[];
    pageQuantity: number;
    saveTransactionData: (transactions: ITransactionData[]) => void;
    setPaginationPageQuantity: (quantity: number) => void;
}


export const useTransactionState = create<TransactionState>((set) => ({
    transactions: [],
    pageQuantity: 0,
    saveTransactionData: (transactions) => set(() => ({ transactions: transactions })),
    setPaginationPageQuantity: (quantity) => set(() => ({ pageQuantity: Math.ceil(quantity) }))
}))