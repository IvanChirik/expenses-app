import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Request, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }


  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(@Request() req, @Query('page') page: number, @Query('limit') limit: number, @Query('filter') filter: string) {
    return this.transactionService.findAllWithPagination(+req.user.id, page, limit, filter)
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto, @Request() req) {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req, @Query('find_title') find_title: string) {
    return this.transactionService.findAll(+req.user.id, find_title);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req) {
    return this.transactionService.findOne(+id, +req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateTransactionDto, @Request() req) {
    return this.transactionService.update(+id, updateCategoryDto, +req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.transactionService.remove(+id, +req.user.id);
  }
}
