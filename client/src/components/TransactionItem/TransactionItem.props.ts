import { HTMLAttributes } from "react";


export interface ITransactionItem extends HTMLAttributes<HTMLDivElement> {
    id: string;
    title: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    createdAt: Date;
}