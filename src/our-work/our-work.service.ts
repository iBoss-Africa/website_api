import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OurWork } from './our-work.model';
import { OurWorkDto } from './dto/create-our-work.dto';
import { User } from '@prisma/client';

@Injectable()
export class OurWorkService {
    constructor(private prisma: PrismaService) { }

    async create(OurWorkDto: OurWorkDto, user: User): Promise<OurWork> {
        return this.prisma.ourWork.create({ data: { ...OurWorkDto, userId: user.id } });
    }

    async findAll(): Promise<OurWork[]> {
        return this.prisma.ourWork.findMany();
    }

    findOne(id: number): Promise<OurWork> {
        return this.prisma.ourWork.findUnique({ where: { id } });
    }

    update(id: number, OurWorkDto: OurWorkDto): Promise<OurWork> {
        return this.prisma.ourWork.update({
            where: { id },
            data: OurWorkDto
        });
    }

    remove(id: number): Promise<OurWork> {
        return this.prisma.ourWork.delete({ where: { id } });
    }
}
