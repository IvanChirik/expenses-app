import { IsNotEmpty, IsNumber, MaxLength } from "class-validator"


export class CreateTransactionDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    @IsNumber()
    amount: number
    @IsNotEmpty()
    @MaxLength(6)
    type: 'income' | 'expense'
    @IsNotEmpty()
    @IsNumber()
    categoryId: number
}
