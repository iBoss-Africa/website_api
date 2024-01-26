import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OurWorkService } from './our-work.service';
import { OurWorkController } from './our-work.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [OurWorkController],
    providers: [OurWorkService, PrismaService],
})
export class OurWorkModule { }
