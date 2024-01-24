import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServiceDto } from './dto/service.dto';
import { User } from '@prisma/client';
import { OurService } from './ourService.model';

@Injectable()
export class ServicesService {
  constructor(
      private prisma: PrismaService,
  ){}

  async getAll(): Promise<any>{
    const allResult = await this.prisma.our_Service.findMany();
    return allResult
  }
  async newService(serviceDto: ServiceDto, user: User): Promise<any> {
    const { title, description, image } = serviceDto;

    const existingUser = await this.prisma.user.findFirst({where:{id: user.id}})
  
    const createdService = await this.prisma.our_Service.create({
      data: {
        title,
        description,
        image,
        user: {
          connect: { id: existingUser.id },
        },
      },
    });

    // Return the createdService object, which now has the user property set
    return createdService;
  }
}