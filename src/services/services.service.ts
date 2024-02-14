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
  ) { }

  // Get all service
  async getAll(website) {
    const allResult = await this.prisma.ourService.findMany({ where: { website } });
    return allResult
  }

  // get specific service
  async getOne(serviceId: number, website) {
    const service = await this.prisma.ourService.findUnique({
      where: {
        id: serviceId,
        website
      }
    })

    if (!service) {
      throw new NotFoundException('Service not found.');
    }

    return service;
  }

  // Create new service ==> POST v1/api/iboss
  async newService(serviceDto: ServiceDto, user: User, website) {
    const { title, description, image } = serviceDto;

    // Get the current user id.
    const existingUser = user.id;

    // Create a new service.
    const createdService = await this.prisma.ourService.create({
      data: {
        title,
        description,
        image,
        userId: existingUser,
        website
      },
    });

    // Return the createdService object, which now has the user property set
    return createdService;
  }

  // Update a service
  async updateService(updateDto: UpdateDto, serviceId: number, website) {
    const { title, description, image } = updateDto;

    // Check if the service exist in the database
    const isExist = await this.prisma.ourService.findUnique({ where: { id: serviceId, website } });

    if (!isExist) {
      throw new NotFoundException('Service not found.');
    }

    // Update the document
    const updateDocument = await this.prisma.ourService.update({
      where: {
        id: serviceId,
        website
      },
      data: { title, description, image }
    });

    return updateDocument;
  }

  // Delete Service
  async deleteService(serviceId: number, website): Promise<{}> {
    const serviceToDelete = await this.prisma.ourService.findUnique({ where: { id: serviceId, website } });

    if (!serviceToDelete) {
      throw new NotFoundException('Service not found.');
    }

    return await this.prisma.ourService.delete({ where: { id: serviceId, website } });
  }
}