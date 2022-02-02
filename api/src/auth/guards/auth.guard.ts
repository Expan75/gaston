import { Inject, forwardRef, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}
  
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.getArgByIndex(2).req
      const parsedToken = await request.headers.authorization.split(' ')[1]
      const decodedToken = await this.authService.validateAccessToken(parsedToken)
      // TODO: insert user object based off token in request scope for decorator to pickup
      if (decodedToken) {
        request.user = {
          _id: decodedToken.sub,
          email: decodedToken.email
        };
        return true;
      }
    } catch (e) {
      // Note that lack of error handling is due to normal practice for nestjs guards: https://docs.nestjs.com/guards
      // Nice to have: a way to surface e.g. TokenExpired as query result
      console.error(e)
      return false
    }
  }
}