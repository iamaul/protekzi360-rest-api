import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigFirebase } from '../config/config.firebase';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigFirebase],
})
export class AuthModule {}
