import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterBusinessDto } from './dto/business.dto';
import { InvestorDto } from './dto/investor.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: User) {
    return this.authService.getProfile(user.id);
  }

  @Post('login')
  async login(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }

  @Post('business')
  async business(@Body() dto: RegisterBusinessDto) {
    return await this.authService.registerBusiness(dto);
  }

  @Post('investor')
  @UseInterceptors(ClassSerializerInterceptor)
  async investor(@Body() dto: InvestorDto) {
    return await this.authService.registerInvestor(dto);
  }
}
