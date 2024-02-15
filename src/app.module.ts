import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { OurWorkModule } from './our-work/our-work.module';
import { ServicesModule } from './services/services.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as cors from 'cors';
import * as xssClean from 'xss-clean';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),

    AuthModule,
    PrismaService,
    OurWorkModule,
    ServicesModule,
    SubscribersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        xssClean(),
        helmet(),
        cors(),
        // rateLimit({
        //   windowMs: 10 * 60 * 1000, // 15 minutes
        //   max: 100, // limit each IP to 100 requests per windowMs
        // }),
      )
      .forRoutes('*')
  }
}
