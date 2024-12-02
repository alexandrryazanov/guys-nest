import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async getAll({
    limit = 10,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  } = {}) {
    return this.prismaService.user.findMany({ take: limit, skip: offset });
  }

  async getById(id: string) {
    const env = this.configService.get<string>('ENV');
    const result = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    return { env, ...result };
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
