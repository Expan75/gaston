import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log('JwtRefreshGuard.getRequest triggered returning ctx')
    return ctx.getContext().req;
  }
}
