import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigFirebase } from '../config/config.firebase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly admin: ConfigFirebase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    try {
      const claims = await app.auth().verifyIdToken(idToken);

      if (claims) {
        // Store the uid value in the request's metadata
        const request = context.switchToHttp().getRequest();
        request.uid = claims.uid;

        return true;
      }

      throw new UnauthorizedException();
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
