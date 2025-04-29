import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AccountType } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';

@Controller('v1/admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('users')
  async getUsers(@Query('accountType') accountType: AccountType) {
    if (!accountType) {
      throw new BadRequestException('accountType query parameter is required');
    }

    return this.adminService.getUsersByType(accountType);
  }
}
