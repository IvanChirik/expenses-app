import { $api } from "@/http";
import { ITransactionData, TransactionType } from "@/interfaces/transaction.interface";
import { TransactionPeriodOptions } from "@/stores/transaction.store";
import { AxiosError } from "axios";

class TransactionService {

    private readonly TRANSACTION_ENDPOINT = '/transactions';

    async createTransaction(transaction: { title: string, amount: number, type: TransactionType, category: { id: number } }) {
        try {
            const { data: transactionData } = await $api.post<ITransactionData>(this.TRANSACTION_ENDPOINT, { ...transaction });
            return transactionData;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findAll(period: TransactionPeriodOptions, filter?: string,) {
        try {
            const { data: transactions } = await $api.get<ITransactionData[]>(this.TRANSACTION_ENDPOINT, {
                params: {
                    filter,
                    period
                }
            });
            return transactions;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findWithPagination(page: number, filter?: string) {
        try {
            const { data: transactions } = await $api.get<ITransactionData[]>(`${this.TRANSACTION_ENDPOINT}/pagination`, {
                params: {
                    page,
                    limit: 5,
                    filter
                }
            });
            return transactions;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findById(transactionId: number) {
        try {
            const { data: transaction } = await $api.get<ITransactionData>(`${this.TRANSACTION_ENDPOINT}/${transactionId}`);
            return transaction;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async updateTransaction(transactionId: number, transaction: { title: string, amount: number, type: TransactionType, category: { id: number } }) {
        try {
            return await $api.patch<ITransactionData>(`${this.TRANSACTION_ENDPOINT}/${transactionId}`, { ...transaction });
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async deleteTransaction(transactionId: number) {
        try {
            return await $api.delete(`${this.TRANSACTION_ENDPOINT}/${transactionId}`);
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
}


export default new TransactionService();