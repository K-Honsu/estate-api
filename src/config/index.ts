import * as crypto from 'node:crypto';
import * as os from 'node:os';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { EnvironmentVariables } from './environment-variables';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const APP_NAME = 'amac';
export const TMP_DIR = path.join(os.tmpdir(), APP_NAME);

if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);
console.log('tmpdir', TMP_DIR);

const env = process.env as unknown as EnvironmentVariables;


export interface Config {
    isProduction: boolean;
    port: number;
    cors: { origin: string[] | string };
    db: { host: string, port: number, username: string, password: string, name: string }
    jwt: { secret: string; issuer: string; audience: string; expiresIn: string };
}

export function configuration() {

    const randomPort = crypto.randomInt(49_152, 65_535);

    const nodeEnv = env.NODE_ENV ?? 'development';
    const isProduction = ['prod', 'production'].includes(nodeEnv?.trim());

    const corsOrigin = '*';

    const config: Config = {
        isProduction,
        port: env.PORT || randomPort,
        cors: {
            origin: corsOrigin,
        },
        jwt: {
            secret: env.JWT_SECRET || 'insecure',
            issuer: env.JWT_ISSUER,
            audience: env.JWT_AUDIENCE,
            expiresIn: env.JWT_EXPIRES_IN || '1hr',
        },
        db: {
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            name: env.DB_NAME
        },
    };

    return config;
}

export function validateEnv(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) throw new Error(errors.toString());

    return validatedConfig;
}