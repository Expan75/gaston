import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const returnedContext = ctx.getContext().req;

    // local.strategy requires email and password to be available directly in the body
    Object.assign(returnedContext.body, {
      email: returnedContext.body.variables.input.email,
      password: returnedContext.body.variables.input.password,
    });

    return returnedContext;
  }
}
