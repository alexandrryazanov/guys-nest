import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
