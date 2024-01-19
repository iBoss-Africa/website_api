import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { InformationModule } from './information/information.module';


@Module({
  imports: [AuthModule, 
    ConfigModule.forRoot(),
     InformationModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
