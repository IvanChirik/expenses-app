
export const enum TransactionType {
    Income = 'income',
    Expense = 'expense'
}

export interface ITransactionData {
    id: number;
    title: string;
    amount: number;
    type: TransactionType
    category: {
        id: number;
        title: string;
    };
    createdAt: Date;
}