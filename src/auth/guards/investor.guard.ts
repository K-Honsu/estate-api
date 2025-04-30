import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountType } from '../../auth/entities/user.entity';

@Injectable()
export class InvestorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.accountType !== AccountType.INVESTOR) {
      throw new ForbiddenException(
        'Only investor accounts can access this resource',
      );
    }

    return true;
  }
}
