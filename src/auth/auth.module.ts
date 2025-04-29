import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Company } from 'src/business/entities/company.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<Config, true>) {
        const jwtConfig = configService.get('jwt', { infer: true });

        return {
          secret: jwtConfig.secret,

          signOptions: {
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience,
            expiresIn: jwtConfig.expiresIn,
          },

          verifyOptions: {
            issuer: jwtConfig.issuer,
            audience: jwtConfig.audience,
          },
        };
      },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
