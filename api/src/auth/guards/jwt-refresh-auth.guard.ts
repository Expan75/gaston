import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
 
@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  getRequest(context: GqlExecutionContext) {
    console.log('JwtRefreshGuard.getRequest() was called /w ctx: ', context);
    const ctx = GqlExecutionContext.create(context);
    console.log('cookies from jwt refresh guard: ', ctx.getContext().req.cookies);
    return ctx.getContext().req;
  }
}