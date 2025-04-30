import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { AccountType } from 'src/auth/entities/user.entity';
import { UserResponseDto } from 'src/auth/interfaces/business.interface';

@Injectable()
export class AdminService {
  private readonly logger: Logger = new Logger(AdminService.name);
  constructor(readonly authService: AuthService) {}

  async getUsersByType(
    accountType: AccountType,
  ): Promise<{ message: string; data: UserResponseDto[] }> {
    try {
      const users = await this.authService.userModel.find({
        where: { accountType },
        relations: ['company'],
      });

      return {
        message: 'Records fetched succcessfully',
        data: plainToInstance(UserResponseDto, users),
      };
    } catch (error) {
      this.logger.error('Error:', error.response?.data || error.message);
      throw new BadRequestException('Invalid user tyoe', error.message);
    }
  }
}
