import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllTransactionsDto } from './dto/get-all-transactions.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async getAll({ limit, offset }: GetAllTransactionsDto) {
    const where: Prisma.TransactionWhereInput = {};

    const amount = await this.prismaService.transaction.count({ where });

    const list = await this.prismaService.transaction.findMany({
      where,
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        date: true,
        description: true,
        amount: true,
        createdAt: true,
      },
    });

    return { amount, list };
  }
}
