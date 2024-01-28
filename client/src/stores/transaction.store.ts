
import { ITransactionData } from "@/interfaces/transaction.interface";
import { create } from "zustand";

export const enum TransactionPeriodOptions {
    Week = 'week',
    Month = 'month',
    Year = 'year'
}


export interface TransactionState {
    transactions: ITransactionData[];
    currentEditTransaction?: ITransactionData;
    transactionPeriod: TransactionPeriodOptions;
    saveTransactionData: (transactions: ITransactionData[]) => void;
    setCurrentEditTransaction: (transaction: ITransactionData | undefined) => void;
    setTransactionPeriod: (period: TransactionPeriodOptions) => void;
}


export const useTransactionState = create<TransactionState>((set) => ({
    transactions: [],
    currentEditTransaction: undefined,
    transactionPeriod: TransactionPeriodOptions.Month,
    saveTransactionData: (transactions) => set(() => ({ transactions: transactions })),
    setCurrentEditTransaction: (transaction) => set(() => ({ currentEditTransaction: transaction })),
    setTransactionPeriod: (period) => set(() => ({ transactionPeriod: period })),
}))