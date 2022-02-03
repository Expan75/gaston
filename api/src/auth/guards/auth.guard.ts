import {
  Inject,
  forwardRef,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(2).req;
    try {
      const parsedToken = request.headers.authorization.split(' ')[1];
      const decodedToken = await this.authService.validateAccessToken(
        parsedToken,
      );
      if (decodedToken) {
        request.user = {
          _id: decodedToken.sub,
          email: decodedToken.email,
        };
        return true;
      }
    } catch (e) {
      // insufficent error propogation curtesy of nestjs guard implmentation convention
      console.error(e);
    }
    return false;
  }
}
