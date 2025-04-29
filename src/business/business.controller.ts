import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BusinessService } from './business.service';
import { User } from 'src/auth/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { BusinessGuard } from './guards/business.guards';
import { InvestorGuard } from 'src/auth/guards/investor.guard';

@Controller('v1')
@UseGuards(JwtAuthGuard, BusinessGuard)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Post('business/projects')
  async createProject(
    @Req() req: Request,
    @Body() createDto: CreateProjectDto
  ) {
    return this.businessService.createProject(req.user as User, createDto);
  }

  @Get('business/projects')
  async getProjects(@Req() req: Request) {
    return this.businessService.getProjects(req.user as User);
  }

  @Get('investor/investments')
  @UseGuards(JwtAuthGuard, InvestorGuard)
  async getInvestments(@Req() req: Request) {
    return this.businessService.getInvestments(req.user as User);
  }
}
