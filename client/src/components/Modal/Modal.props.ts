import { ITransactionData, TransactionType } from "@/interfaces/transaction.interface";
import { HTMLAttributes } from "react";



export interface IModal extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    onClose: () => void;
}