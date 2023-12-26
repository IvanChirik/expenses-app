import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transactions)
    private readonly transactionRepository: Repository<Transactions>
  ) { }


  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: {
        id: +createTransactionDto.categoryId
      },
      user: {
        id
      }
    }
    if (!newTransaction)
      throw new BadRequestException('Что-то пошло не так....')
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: {
          id
        }
      },
      order: {
        createdAt: 'DESC'
      }
    })
    if (!transactions.length)
      throw new BadRequestException('Что-то пошло не так....')
    return transactions;
  }

  async findOne(id: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        user: {
          id: userId
        },
        id
      },
      relations: {
        category: true,
        user: true
      }
    });
    if (!transaction)
      throw new BadRequestException('Транзакция не найдена')
    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        user: {
          id: userId
        },
        id
      }
    });
    if (!transaction)
      throw new BadRequestException('Транзакция не найдена');
    return await this.transactionRepository.update(id, updateTransactionDto)
  }

  async remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
