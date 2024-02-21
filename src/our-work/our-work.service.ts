import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OurWork } from './our-work.model';
import { OurWorkDto } from './dto/create-our-work.dto';
import { User } from '@prisma/client';

@Injectable()
export class OurWorkService {
    constructor(private prisma: PrismaService) { }

    async create(OurWorkDto: OurWorkDto, user: User, website): Promise<OurWork> {
        return this.prisma.ourWork.create({ data: { ...OurWorkDto, userId: user.id, website } });
    }

    async findAll(website): Promise<OurWork[]> {
        return this.prisma.ourWork.findMany({ where: { website } });
    }

    async findOne(id: number, website): Promise<OurWork> {
        return this.prisma.ourWork.findUnique({ where: { id, website } });
    } y

    async update(id: number, OurWorkDto: OurWorkDto, website): Promise<OurWork> {
        return this.prisma.ourWork.update({
            where: { id, website },
            data: OurWorkDto
        });
    }

    async remove(id: number, website): Promise<OurWork> {
        const work = await this.prisma.ourWork.findUnique({ where: { id, website } });
        if (!work) {
            throw new NotFoundException('Work not found.');
        }
        return this.prisma.ourWork.delete({ where: { id, website } });
    }
}
