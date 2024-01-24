import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServiceDto } from './dto/service.dto';
import { User } from '@prisma/client';
import { OurService } from './ourService.model';
import { UpdateDto } from './dto/update.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ServicesService {
  constructor(
      private prisma: PrismaService,
  ){}

  // Get all service
  async getAll(){
    const allResult = await this.prisma.our_Service.findMany();
    return allResult
  }

  // get specific service
  async getOne(id){
    const service = await this.prisma.our_Service.findUnique({where:{
      id: id
    }})

    if(service){
      throw new NotFoundException('Service not found.');
    }

    return service;
  }

  // Create new service
  async newService(serviceDto: ServiceDto, user: User){
    const { title, description, image } = serviceDto;

    // Get the current user id.
    const existingUser = await this.prisma.user.findFirst({where:{id: user.id}})
  
    // Create a new service.
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


  // Update a service
  async updateService(updateDto: UpdateDto, id: number){
    const {title, description, image} = updateDto;

    // Check if the service exist in the database
    const isExist = await this.prisma.our_Service.findUnique({where:{id: id}});

    if(!isExist){
      throw  new NotFoundException('Service not found.');
    }

    // Update the document
    const updateDocument = await this.prisma.our_Service.update({where:{
      id: id},
      data:{title, description, image}
    })

    return updateDocument;
  }

  // Delete Service
  async deleteService(id: number){
    
    return await this.prisma.our_Service.delete({
      where: {id}
    })
  }
}