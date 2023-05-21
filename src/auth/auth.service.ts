import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigFirebase } from '../config/config.firebase';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly admin: ConfigFirebase) {}

  async createAuth(authRequest: AuthDTO): Promise<any> {
    const { email, firstName, role } = authRequest;
    const app = this.admin.setup();

    try {
      const createdAuth = await app.auth().createUser({
        email,
        displayName: firstName,
      });

      await app.auth().setCustomUserClaims(createdAuth.uid, { role });
      return createdAuth;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
