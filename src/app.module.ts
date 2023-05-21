import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configDb from './config/config.database';
import { ConfigFirebase } from './config/config.firebase';
import { ScanModule } from './domain/scan/scan.module';
import { AppMetadataService } from './domain/app-metadata/app-metadata.service';
import { AppMetadataModule } from './domain/app-metadata/app-metadata.module';
import { ThreatService } from './domain/threat/threat.service';
import { ThreatModule } from './domain/threat/threat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [configDb],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    AuthModule,
    UserModule,
    ScanModule,
    AppMetadataModule,
    ThreatModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigFirebase],
})
export class AppModule {}
