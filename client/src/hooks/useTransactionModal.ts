import { useTransactionState } from '@/stores/transaction.store';
import { toast } from 'react-toastify';
import transactionService from '@/services/transactionService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { TransactionType } from '@/interfaces/transaction.interface';

export interface ITransactionForm {
    title: string;
    amount: number;
    date: Date;
}
export interface ITransactionSendData {
    id?: number;
    createdAt: Date;
    title: string,
    amount: number,
    category: {
        id: number
    },
    type: TransactionType
}

export const useTransactionModal = (onClose: () => void) => {
    const { getFieldState, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ITransactionForm>();
    const [categoryId, setCategoryId] = useState<number>(NaN);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [activeTransactionButton, setActiveTransactionButton] = useState<TransactionType>(TransactionType.Expense);
    const { currentEditTransaction } = useTransactionState();


    const queryClient = useQueryClient();
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.findAll(),
    });
    const { mutate } = useMutation({
        mutationFn: async (transaction: ITransactionSendData) => {
            if (currentEditTransaction)
                return await transactionService.updateTransaction(transaction.id!, { ...transaction });
            return await transactionService.createTransaction({ ...transaction });
        },
        onSuccess: () => {
            onClose();
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            (() => toast.success('Транзакция успешно создана'))();
        },
        onError: (variable) => {
            (() => toast.error(variable.toString()))()
        },
    });


    const submit: SubmitHandler<ITransactionForm> = (data) => {
        mutate({
            id: currentEditTransaction?.id,
            title: data.title,
            createdAt: new Date(data.date),
            amount: +data.amount,
            type: activeTransactionButton,
            category: {
                id: categoryId
            }
        })
    };
    const sumbitHandler = (handleSubmit(submit));


    useEffect(() => {
        if (currentEditTransaction) {
            setCategoryId(currentEditTransaction.category.id);
            setActiveTransactionButton(currentEditTransaction.type);
            setValue('title', currentEditTransaction.title);
            setValue('amount', currentEditTransaction.amount);
        }
    }, []);
    useEffect(() => {
        if (!isNaN(categoryId))
            setDisabledButton(false)
    }, [getFieldState, categoryId]);

    return {
        formContol: {
            register,
            sumbitHandler,
            errors,
            setValue
        },
        categoryState: {
            categories,
            setCategoryId
        },
        typeButton: {
            transactionType: activeTransactionButton,
            setTransactionType: setActiveTransactionButton
        },
        currentEditTransaction,
        disabledButton
    }
}