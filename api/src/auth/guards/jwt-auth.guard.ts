import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: GqlExecutionContext) {
    console.log("JwtAuthGuard.getRequest() was called /w ctx: ", context)
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req.headers)
    return ctx.getContext().req;
  }
}