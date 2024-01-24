import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OurWork } from './our-work.model';
import { CreateOurWorkDto } from './dto/create-our-work.dto';
import { UpdateOurWorkDto } from './dto/update-our-work.dto';

@Injectable()
export class OurWorkService {
    constructor(private prisma: PrismaService) { }

    async create(createOurWorkDto: CreateOurWorkDto): Promise<OurWork> {
        return this.prisma.our_Work.create({ data: createOurWorkDto });
    }

    async findAll(): Promise<OurWork[]> {
        return this.prisma.our_Work.findMany();
    }

    findOne(id: number): Promise<OurWork> {
        return this.prisma.our_Work.findUnique({ where: { id } });
    }

    update(id: number, updateOurWorkDto: UpdateOurWorkDto): Promise<OurWork> {
        return this.prisma.our_Work.update({
            where: { id },
            data: updateOurWorkDto
        });
    }

    remove(id: number): Promise<OurWork> {
        return this.prisma.our_Work.delete({ where: { id } });
    }
}
