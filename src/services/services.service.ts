import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServiceDto } from './dto/service.dto';
import { User } from '@prisma/client';
import { UpdateDto } from './dto/update.dto';
import { Query } from 'express-serve-static-core';
import { OurService } from './ourService.model';

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
  async getOne(serviceId: number){
    const service = await this.prisma.our_Service.findUnique({where:{
      id: serviceId
    }})

    if(!service){
      throw new NotFoundException('Service not found.');
    }

    return service;
  }

  // Create new service ==> POST v1/api/iboss
  async newService(serviceDto: ServiceDto, user: User){
    const { title, description, image } = serviceDto;

    // Get the current user id.
    const existingUser = user.id;
  
    // Create a new service.
    const createdService = await this.prisma.our_Service.create({
      data: {
        title,
        description,
        image,
        userId: existingUser,
      },
    });

    // Return the createdService object, which now has the user property set
    return createdService;
  }

  // Update a service
  async updateService(updateDto: UpdateDto, serviceId: number): Promise<OurService>{
    const {title, description, image} = updateDto;

    // Check if the service exist in the database
    const isExist = await this.prisma.our_Service.findUnique({where:{id: serviceId}});

    if(!isExist){
      throw  new NotFoundException('Service not found.');
    }

    // Update the document
    const updateDocument = await this.prisma.our_Service.update({where:{
      id: serviceId},
      data:{title, description, image}
    });

    return updateDocument;
  }

  // Delete Service
  async deleteService(serviceId: number): Promise<{}>{
    const serviceToDelete = await this.prisma.our_Service.findUnique({where:{id: serviceId}});

    if(!serviceToDelete){
      throw new NotFoundException('Service not found.');
    }

    return await this.prisma.our_Service.delete({where: {id: serviceId}});
  }
}