
import { ITransactionData } from "@/interfaces/transaction.interface";
import { create } from "zustand";



export interface TransactionState {
    transactions: ITransactionData[];
    pageQuantity: number;
    currentEditTransaction?: ITransactionData;
    saveTransactionData: (transactions: ITransactionData[]) => void;
    setPaginationPageQuantity: (quantity: number) => void;
    setCurrentEditTransaction: (transaction: ITransactionData | undefined) => void;
}


export const useTransactionState = create<TransactionState>((set) => ({
    transactions: [],
    pageQuantity: 0,
    currentEditTransaction: undefined,
    saveTransactionData: (transactions) => set(() => ({ transactions: transactions })),
    setPaginationPageQuantity: (quantity) => set(() => ({ pageQuantity: Math.ceil(quantity) })),
    setCurrentEditTransaction: (transaction) => set(() => ({ currentEditTransaction: transaction }))
}))