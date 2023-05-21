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
import { AppMetadataModule } from './domain/app-metadata/app-metadata.module';
import { ThreatModule } from './domain/threat/threat.module';
import { PaymentModule } from './domain/payment/payment.module';
import { MidtransModule } from './midtrans/midtrans.module';

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
    MidtransModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        isProduction: !!JSON.parse(
          configService.get<string>('MIDTRANS_IS_PRODUCTION'),
        ),
        serverKey: configService.get<string>('MIDTRANS_SERVER_KEY'),
        clientKey: configService.get<string>('MIDTRANS_CLIENT_KEY'),
      }),
    }),
    AuthModule,
    UserModule,
    ScanModule,
    AppMetadataModule,
    ThreatModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigFirebase],
})
export class AppModule {}
