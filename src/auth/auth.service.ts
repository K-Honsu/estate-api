import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';
import { InvestorDto } from './dto/investor.dto';
import { RegisterBusinessDto } from './dto/business.dto';
import { plainToInstance } from 'class-transformer';
import { RegisterBusinessResponseDto, CompanyResponseDto, UserResponseDto } from './interfaces/business.interface';
import { ProfileDto } from './dto/profile.dto';
import { BusinessService } from 'src/business/business.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) readonly userModel: Repository<User>,
        private readonly jwtService: JwtService,
        readonly businessService: BusinessService,
    ) {

    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ where: { email } });
    }

    async registerBusiness(dto: RegisterBusinessDto): Promise<{ message: string, data: RegisterBusinessResponseDto }> {
        const existingUser = await this.userModel.findOne({
            where: { email: dto.user.email }
        });
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        const existingCompany = await this.businessService.companyModel.findOne({
            where: { companyRegNumber: dto.companyRegNumber },
        });
        if (existingCompany) {
            throw new ConflictException('Company registration number already in use');
        }

        const hashedPassword = await bcrypt.hash(dto.user.password, 10);

        const user = this.userModel.create({
            ...dto.user,
            password: hashedPassword,
            accountType: dto.accountType
        });

        const company = this.businessService.companyModel.create({
            companyName: dto.companyName,
            companyRegNumber: dto.companyRegNumber,
            companyAddress: dto.companyAddress
        });

        company.user = user;
        user.company = company;

        await this.userModel.save(user);
        await this.businessService.companyModel.save(company);

        return {
            message: "Business created successfully",
            data: {
                company: plainToInstance(CompanyResponseDto, company),
                user: plainToInstance(UserResponseDto, user)
            }

        };
    }

    async registerInvestor(dto: InvestorDto): Promise<{ message: string, data: User }> {
        const { email, password } = dto
        const existingUser = await this.findByEmail(email);

        if (existingUser) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userModel.create({
            ...dto,
            password: hashedPassword,
        });

        const result = await this.userModel.save(user)

        return { message: "Investor created successfully", data: result }
    }

    async validateUser(email: string, password: string): Promise<{ message: string, data: User | null }> {
        const user = await this.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return { message: "User data gotten", data: result as User }
        }

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return { message: "gotten", data: user };
    }

    async login(dto: SignInDto) {
        const { email, password } = dto
        const user = await this.validateUser(email, password);
        const payload: JwtPayload = { email: user.data.email, sub: user.data.id, accountType: user.data.accountType };
        const token = this.jwtService.sign(payload)

        return {
            token, user: user.data
        };
    }

    async getProfile(userId: string): Promise<ProfileDto> {
        const user = await this.userModel.findOne({
            where: { id: userId },
            relations: ['company']
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return plainToInstance(ProfileDto, user);
    }
}
