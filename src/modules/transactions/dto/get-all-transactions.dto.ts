import { PaginationDto } from '@/dto/pagination.dto';

export class GetAllTransactionsDto extends PaginationDto {}

export const getAllTransactionsResponse = {
  status: 200,
  description: 'Transactions',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        date: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        amount: { type: 'number' },
      },
    },
  },
};
