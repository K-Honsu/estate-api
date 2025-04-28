import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    Matches,
    Max,
    Min,
} from 'class-validator';
import { NodeEnv } from 'src/common/enums/node-env.enum';

export class EnvironmentVariables {
    @Max(65535)
    @Min(0)
    @IsNumber()
    PORT: number;

    @IsEnum(NodeEnv)
    NODE_ENV: NodeEnv;

    @IsString()
    @IsOptional()
    JWT_SECRET: string;

    @IsUrl()
    @IsOptional()
    JWT_ISSUER: string;

    @IsUrl()
    @IsOptional()
    JWT_AUDIENCE: string;

    @Matches(/^\d+[shd]?$/)
    @IsOptional()
    JWT_EXPIRES_IN: string;

    @IsString()
    @IsOptional()
    DB_HOST: string

    @IsNumber()
    @IsOptional()
    DB_PORT: number

    @IsString()
    @IsOptional()
    DB_USERNAME: string

    @IsString()
    @IsOptional()
    DB_PASSWORD: string

    @IsString()
    @IsOptional()
    DB_NAME: string
}