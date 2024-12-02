import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetAllUsersDto, getAllUsersResponse } from './dto/get-all-users.dto';
import { AuthGuard } from '../../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from '@/decorators/user-id.decorator';

@ApiTags('Users endpoints')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: 'Get logged user' })
  async getMe(@UserId() userId: string) {
    return this.usersService.getById(userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse(getAllUsersResponse)
  async getAll(@Query() { offset, limit }: GetAllUsersDto) {
    return this.usersService.getAll({ limit, offset });
  }
}
