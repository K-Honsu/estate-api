import { Exclude } from 'class-transformer';

export class InvestorResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  accountType: string;
  createdAt: Date;
  updatedAt: Date;
  
  @Exclude()
  password: string;
}