import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Company } from './entities/company.entity';
import { plainToInstance } from 'class-transformer';
import { InvestmentResponseDto } from 'src/auth/dto/investor.dto';
import { Investment } from './entities/investment.entity';

@Injectable()
export class BusinessService {
    constructor(
        @InjectRepository(Company)
        readonly companyModel: Repository<Company>,
        @InjectRepository(Project)
        private projectModel: Repository<Project>,
        @InjectRepository(Investment)
        private investmentModel: Repository<Investment>,
    ) { }

    async createProject(user: User, dto: CreateProjectDto): Promise<Project> {
        const company = await this.companyModel.findOne({
            where: { user: { id: user.id } },
            relations: ['user']
        });

        if (!company) {
            throw new NotFoundException('Company not found for this user');
        }

        const project = this.projectModel.create({
            ...dto,
            company
        });

        return this.projectModel.save(project);
    }

    async getProjects(user: User): Promise<Project[]> {
        return this.projectModel.find({
            where: { company: { user: { id: user.id } } },
            relations: ['company']
        });
    }

    async getInvestments(user: User): Promise<InvestmentResponseDto[]> {
        const investments = await this.investmentModel.find({
            where: { investor: { id: user.id } },
            relations: ['project']
        });

        return plainToInstance(InvestmentResponseDto, investments, {
            excludeExtraneousValues: true,
        });
    }
}
