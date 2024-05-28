import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllUsersDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === '1')
  test?: boolean;
}

export const getAllUsersResponse = {
  status: 200,
  description: 'Users',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        hashedPassword: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    },
  },
};
