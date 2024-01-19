
export interface ITransactionData {
    id: number;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    category: {
        id: number;
    };
    user: {
        id: number;
    };
    createdAt: Date;
    updatedAt: Date;
}