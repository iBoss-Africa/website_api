import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OurWork } from './our-work.model';
import { OurWorkDto } from './dto/create-our-work.dto';
import { User } from '@prisma/client';

@Injectable()
export class OurWorkService {
    constructor(private prisma: PrismaService) { }

    async create(OurWorkDto: OurWorkDto, user: User): Promise<OurWork> {
        return this.prisma.our_Work.create({ data: { ...OurWorkDto, userId: user.id } });
    }

    async findAll(): Promise<OurWork[]> {
        return this.prisma.our_Work.findMany();
    }

    findOne(id: number): Promise<OurWork> {
        return this.prisma.our_Work.findUnique({ where: { id } });
    }

    update(id: number, updateOurWorkDto: OurWorkDto): Promise<OurWork> {
        return this.prisma.our_Work.update({
            where: { id },
            data: updateOurWorkDto
        });
    }

    remove(id: number): Promise<OurWork> {
        return this.prisma.our_Work.delete({ where: { id } });
    }
}
