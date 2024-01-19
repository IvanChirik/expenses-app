import { $api } from "@/http";
import { ITransactionData } from "@/interfaces/transaction.interface";
import { AxiosError } from "axios";

class TransactionService {

    private readonly TRANSACTION_ENDPOINT = '/transactions';

    async createTransaction(trancaction: { title: string, amount: number, type: 'income' | 'expense', category: { id: number } }) {
        try {
            const { data: transaction } = await $api.post<ITransactionData>(this.TRANSACTION_ENDPOINT, { ...trancaction });
            return transaction;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findAll() {
        try {
            const { data: transactions } = await $api.get<ITransactionData[]>(this.TRANSACTION_ENDPOINT);
            return transactions;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findWithPagination(page: number) {
        try {
            const { data: transactions } = await $api.get<ITransactionData[]>(`${this.TRANSACTION_ENDPOINT}/pagination`, {
                params: { page, limit: 5 }
            });
            return transactions;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findById(transactionId: number) {
        try {
            const { data: transaction } = await $api.get<ITransactionData>(`${this.TRANSACTION_ENDPOINT}/:${transactionId}`);
            return transaction;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async updateCategory(transactionId: number, title?: string, amount?: number) {
        try {
            return await $api.patch(`${this.TRANSACTION_ENDPOINT}/:${transactionId}`, { title, amount });
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async deleteCategory(transactionId: number) {
        try {
            return await $api.delete(`${this.TRANSACTION_ENDPOINT}/:${transactionId}`);
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
}


export default new TransactionService();