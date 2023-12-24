import { Categories } from "src/category/entities/category.entity";
import { Users } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn({ name: 'transaction_id' })
    id: number
    @Column()
    title: string
    @Column()
    amount: number
    @Column({ nullable: true })
    type: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @ManyToOne(() => Users, (user) => user.transactions)
    @JoinColumn({ name: 'user_id' })
    user: Users
    @ManyToOne(() => Categories, (category) => category.transactions)
    @JoinColumn({ name: 'category_id' })
    category: Categories
}
