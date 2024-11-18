import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  GetAllTransactionsDto,
  getAllTransactionsResponse,
} from './dto/get-all-transactions.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  @ApiResponse(getAllTransactionsResponse)
  getAll(@Query() dto: GetAllTransactionsDto) {
    return this.transactionsService.getAll(dto);
  }
}
