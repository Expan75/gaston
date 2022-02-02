import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt') {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    console.log(
      'logging alteredContext in jwtRefreshGuard: ',
      ctx.getContext().req,
    );
    return ctx.getContext().req;
  }
}
