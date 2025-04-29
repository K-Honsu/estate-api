import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { AccountType } from 'src/auth/entities/user.entity';
import { UserResponseDto } from 'src/auth/interfaces/business.interface';

@Injectable()
export class AdminService {
    constructor(
        readonly authService: AuthService
    ) { }


    async getUsersByType(accountType: AccountType): Promise<{ message: string, data: UserResponseDto[] }> {
        const users = await this.authService.userModel.find({
            where: { accountType },
            relations: ['company']
        });

        return { message: "Records fetched succcessfully", data: plainToInstance(UserResponseDto, users) }
    }
}
