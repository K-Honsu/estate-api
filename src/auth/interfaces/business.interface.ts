import { Exclude } from 'class-transformer';

export class UserResponseDto {
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
  
  @Exclude()
  company: any;
}

export class CompanyResponseDto {
  id: string;
  companyName: string;
  companyRegNumber: string;
  companyAddress: string;
  createdAt: Date;
  updatedAt: Date;
  
  @Exclude()
  user: any;
}

export class RegisterBusinessResponseDto {
  company: CompanyResponseDto;
  user: UserResponseDto;
}