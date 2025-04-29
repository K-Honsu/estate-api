import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Project } from './entities/project.entity';
import { Investment } from './entities/investment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Project, Investment]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports : [BusinessService]
})
export class BusinessModule { }
