import { Transactions } from "src/transaction/entities/transaction.entity";
import { Users } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn({ name: 'category_id' })
    id: number
    @Column()
    title: string
    @Column()
    color: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @OneToMany(() => Transactions, (transaction) => transaction.category)
    transactions: Transactions[]
    @ManyToOne(() => Users, (user) => user.categories)
    @JoinColumn({ name: 'user_id' })
    user: Users
}
