import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OurWork } from './entities/ourWork.entity';
import { Service } from './entities/service.entity';
import { subscriber } from './entities/subscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OurWork, Service,subscriber])
  ],
  controllers: [InformationController],
  providers: [InformationService]
})
export class InformationModule {}
