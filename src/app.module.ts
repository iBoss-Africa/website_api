import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { InformationModule } from './information/information.module';


@Module({
  imports: [AuthModule, 
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async(configService: ConfigService)=>({
        type: 'postgres',
        host: 'localhost',
        port: configService.get('TYPEORM_PORT'), //configService.get()  get the password from the .env file
        username: 'postgres',
        password: configService.get('DATABASE_PASSWORD'), //configService.get()  get the password from the .env file
        database: 'iboss',
        entities: [__dirname+ '/**/*.entity(.ts,.js'], //all directories and all files /**/*/,entities
        synchronize: true //shouldnt be used in production.!!!
      }),
      inject: [ConfigService]
    }), InformationModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
