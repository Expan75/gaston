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
export class JwtRefreshTokenGuard implements CanActivate {
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
      const parsedToken =
        request.body.variables.input.refreshToken.split(' ')[1];
      const decodedRefreshToken = await this.authService.validateRefreshToken(
        parsedToken,
      );
      if (decodedRefreshToken) {
        // issueance of new access token is handled at the auth resolver level
        request.user = {
          _id: decodedRefreshToken.sub,
          email: decodedRefreshToken.email,
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
