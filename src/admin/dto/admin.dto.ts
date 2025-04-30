// src/auth/dto/user-response.dto.ts
import { Expose } from 'class-transformer';
import { AccountType } from 'src/auth/entities/user.entity';

export class ResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  state: string;

  @Expose()
  accountType: AccountType;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  createdAt: Date;

  @Expose()
  company?: {
    name: string;
    regNumber: string;
  };
}
