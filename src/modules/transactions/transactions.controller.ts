import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  GetAllTransactionsDto,
  getAllTransactionsResponse,
} from './dto/get-all-transactions.dto';
import { ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/guards/auth.guard';
import { UserId } from '@/decorators/user-id.decorator';
import { CreateTransactionDto } from '@/modules/transactions/dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @ApiResponse(getAllTransactionsResponse)
  @UseGuards(AuthGuard)
  getAll(@UserId() userId: string, @Query() dto: GetAllTransactionsDto) {
    return this.transactionsService.getAll(dto, userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@UserId() userId: string, @Body() dto: CreateTransactionDto) {
    return this.transactionsService.create(dto, userId);
  }
}
