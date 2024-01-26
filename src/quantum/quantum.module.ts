import { Module } from '@nestjs/common';
import { QuantumController } from './quantum.controller';
import { QuantumService } from './quantum.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [QuantumController],
  providers: [QuantumService,PrismaService]
})
export class QuantumModule {}
