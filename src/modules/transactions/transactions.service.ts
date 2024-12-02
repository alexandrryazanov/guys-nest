import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllTransactionsDto } from './dto/get-all-transactions.dto';
import { Prisma } from '@prisma/client';
import { CreateTransactionDto } from '@/modules/transactions/dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prismaService: PrismaService) {}

  async getAll({ limit, offset }: GetAllTransactionsDto, userId: string) {
    const where: Prisma.TransactionWhereInput = { userId };

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

  async create(dto: CreateTransactionDto, userId: string) {
    if (dto.supplierId) {
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id: dto.supplierId },
      });

      if (!supplier) throw new NotFoundException('No supplier with such id');
    }

    if (dto.bankId) {
      const bank = await this.prismaService.bank.findUnique({
        where: { id: dto.bankId },
      });

      if (!bank) throw new NotFoundException('No bank with such id');
    }

    if (dto.categoryId) {
      const category = await this.prismaService.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) throw new NotFoundException('No category with such id');
    }

    return this.prismaService.transaction.create({
      data: {
        date: dto.date,
        name: dto.name,
        description: dto.description,
        amount: dto.amount,
        bank: dto.bankId ? { connect: { id: dto.bankId } } : null,
        category: dto.categoryId ? { connect: { id: dto.categoryId } } : null,
        supplier: dto.supplierId ? { connect: { id: dto.supplierId } } : null,
        user: { connect: { id: userId } },
        tags: dto.tags
          ? {
              connectOrCreate: dto.tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : null,
      },
    });
  }
}
