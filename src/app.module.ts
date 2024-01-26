import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { OurWorkModule } from './our-work/our-work.module';
import { ServicesModule } from './services/services.module';
import { QuantumModule } from './quantum/quantum.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),

    AuthModule,
    PrismaService,
    QuantumModule,
    OurWorkModule,
    ServicesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
