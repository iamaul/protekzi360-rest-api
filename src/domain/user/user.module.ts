import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserMetadataEntity } from '../../typeorm';
import { ConfigFirebase } from '../../config/config.firebase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserMetadataEntity])],
  providers: [UserService, ConfigFirebase],
  controllers: [UserController],
})
export class UserModule {}
