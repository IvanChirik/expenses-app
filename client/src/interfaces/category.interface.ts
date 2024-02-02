import { COLOR } from "@/helpers/colorSchema";
import { ITransactionData } from "./transaction.interface";

export interface ICategoryData {
    id: number;
    title: string;
    color: COLOR;
    createdAt: Date;
    transactions: Omit<ITransactionData, 'category'>[]
}