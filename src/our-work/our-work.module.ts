import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OurWorkService } from './our-work.service';
import { OurWorkController } from './our-work.controller';

@Module({
    controllers: [OurWorkController],
    providers: [OurWorkService, PrismaService],
})
export class OurWorkModule { }
