import { IsNotEmpty, IsNumber, MaxLength } from "class-validator"
import { Categories } from "src/category/entities/category.entity"


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
    category: Categories
}
