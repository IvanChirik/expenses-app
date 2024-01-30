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


  async findAllWithPagination(id: number, page: number, limit: number, filter: string) {
    let transactions = await this.transactionRepository.find({
      where: {
        user: {
          id
        }
      },
      relations: {
        category: true
      },
      order: {
        createdAt: "DESC"
      },
      take: limit,
      skip: (page - 1) * limit
    });
    if (filter && transactions.length !== 0) {
      transactions = transactions.filter((transaction) => transaction.title.includes(filter) || transaction.category.title.includes(filter));
    }
    if (transactions.length == 0)
      throw new BadRequestException('Транзакции не найдены');
    return transactions;
  }


  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: {
        id: +createTransactionDto.category.id
      },
      user: {
        id
      },
      createdAt: new Date(createTransactionDto.createdAt)
    }
    if (!newTransaction)
      throw new BadRequestException('Что-то пошло не так....');
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll(id: number, findParam: string) {
    let transactions = await this.transactionRepository.find({
      where: {
        user: {
          id
        }
      },
      relations: { category: true },
      order: {
        createdAt: 'DESC'
      }
    });
    if (findParam && transactions.length !== 0) {
      transactions = transactions.filter((transaction) => transaction.title.includes(findParam) || transaction.category.title.includes(findParam))
    }
    if (transactions.length === 0)
      throw new BadRequestException('Что-то пошло не так....');
    return transactions;
  }

  async findOne(id: number, userId?: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        user: {
          id: userId
        },
        id
      },
      relations: {
        category: true,
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

  async remove(id: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
        user: {
          id: userId
        }
      }
    });
    if (!transaction)
      throw new BadRequestException('Транзакция для удаления не найдена');

    return await this.transactionRepository.delete(id);
  }
}

