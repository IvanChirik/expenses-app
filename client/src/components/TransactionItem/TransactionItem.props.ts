import { ITransactionData } from "@/interfaces/transaction.interface";
import { HTMLAttributes } from "react";


export interface ITransactionItem extends HTMLAttributes<HTMLDivElement> {
    transaction: ITransactionData;
    transactionPage: number;
}