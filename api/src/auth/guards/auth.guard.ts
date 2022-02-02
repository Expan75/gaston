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
      const parsedToken = await context.getArgByIndex(2).req.headers.authorization.split(' ')[1]
      const decodedToken = await this.authService.validateAccessToken(parsedToken)
      // TODO: insert user object based off token in request scope for decorator to pickup
      if (decodedToken) {
        return true;
      }
    } catch (e) {
      // Note that lack of error handling is due to normal practice for nestjs guards: https://docs.nestjs.com/guards
      console.error(e)
      return false
    }
  }
}