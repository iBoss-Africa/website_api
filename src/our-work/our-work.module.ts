import { Module } from '@nestjs/common';
import { OurWorkService } from './our-work.service';
import { OurWorkController } from './our-work.controller';

@Module({
    controllers: [OurWorkController],
    providers: [OurWorkService],
})
export class OurWorkModule { }
