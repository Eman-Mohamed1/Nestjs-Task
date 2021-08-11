import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../user/models/user.entity';

export const Userdec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);