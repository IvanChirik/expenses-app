import { Categories } from "src/category/entities/category.entity";
import { Transactions } from "src/transaction/entities/transaction.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @OneToMany(() => Categories, (category) => category.user, { onDelete: 'CASCADE' })
    categories: Categories[]
    @OneToMany(() => Transactions, (transaction) => transaction.user, { onDelete: 'CASCADE' })
    transactions: Transactions[]
}
