import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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
  private readonly logger: Logger = new Logger(BusinessService.name);
  constructor(
    @InjectRepository(Company)
    readonly companyModel: Repository<Company>,
    @InjectRepository(Project)
    private projectModel: Repository<Project>,
    @InjectRepository(Investment)
    private investmentModel: Repository<Investment>,
  ) {}

  async createProject(user: User, dto: CreateProjectDto): Promise<Project> {
    try {
      const company = await this.companyModel.findOne({
        where: { user: { id: user.id } },
        relations: ['user'],
      });

      if (!company) {
        throw new NotFoundException('Company not found for this user');
      }

      const project = this.projectModel.create({
        ...dto,
        company,
      });

      return this.projectModel.save(project);
    } catch (error) {
      this.logger.error('Error:', error.response?.data || error.message);
      throw new BadRequestException('Error in creating project', error.message);
    }
  }

  async getProjects(user: User): Promise<{ message: string; data: Project[] }> {
    try {
      const data = await this.projectModel.find({
        where: { company: { user: { id: user.id } } },
        relations: ['company'],
      });

      return { message: 'Project(s) gotten successfully', data };
    } catch (error) {
      this.logger.error('Error:', error.response?.data || error.message);
      throw new BadRequestException('Failed to get projects', error.message);
    }
  }

  async getInvestments(
    user: User,
  ): Promise<{ message: string; data: InvestmentResponseDto[] }> {
    try {
      const investments = await this.investmentModel.find({
        where: { investor: { id: user.id } },
        relations: ['project'],
      });

      return {
        message: 'Investments gotten successfully',
        data: plainToInstance(InvestmentResponseDto, investments, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      this.logger.error('Error:', error.response?.data || error.message);
      throw new BadRequestException('Failed to get investment', error.message);
    }
  }
}
