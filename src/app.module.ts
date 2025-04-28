import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config"
import { Config, configuration, validateEnv } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: validateEnv,
      isGlobal: true,
      cache: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Config, true>) => {
        const config = configService.get("db", { infer: true })
        return {
          synchronize: true,
          logging: true,
          type: "mysql",
          host: config.host,
          port: config.port,
          password: config.password,
          database: config.name,
          username: config.username

        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
