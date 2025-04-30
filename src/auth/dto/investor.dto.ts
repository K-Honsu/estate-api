import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { AccountType } from '../entities/user.entity';
import { Expose } from 'class-transformer';

export class InvestorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  // @Exclude()
  password: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  accountType: AccountType;

  @IsString()
  state: string;

  @IsString()
  firstName: string;

  @IsString()
  phone: string;

  @IsString()
  lastName: string;
}

export class InvestmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  amount: number;

  @Expose()
  status: string;

  @Expose()
  project: {
    id: string;
    name: string;
  };

  @Expose()
  createdAt: Date;
}
