import { Exclude, Expose } from 'class-transformer';
import { AccountType } from '../entities/user.entity';

export class ProfileDto {
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

    @Exclude()
    password: string

    @Expose()
    lastName: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}