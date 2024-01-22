import { ITransactionData } from "./transaction.interface";

export interface ICategoryData {
    id: number;
    title: string;
    createdAt: Date;
    transactions: Omit<ITransactionData, 'category'>[]
}