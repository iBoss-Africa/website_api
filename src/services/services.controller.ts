import { Controller, Body, Post, UsePipes, UseGuards, Get, Param,  Patch, Delete, Query,} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { OurServiceSchema, UpdateOurServiceSchema, userValidation } from 'src/utils/joi.validation';
import { UpdateDto } from './dto/update.dto';
import {Query as ExpressQuery} from 'express-serve-static-core'


@Controller('services')
export class ServicesController {
    constructor(private readonly serviceService : ServicesService){}

        // get all services created
        @Get()
        async getAll(
        ){
            return await this.serviceService.getAll();
        }

        // Get specific service
        @Get(':id')
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async getOne(@Param('id') id: string){
            return await this.serviceService.getOne(parseInt(id));
        }

        // Create new Service
        @Post('/')
        // @UsePipes(new userValidation(OurServiceSchema))
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async createNewService(
            @Body()
            serviceDto:ServiceDto,
            @CurrentUser() user: User,

        ){
            return this.serviceService.newService(serviceDto, user)
        }
            
        // Update Service
        @Patch(':id')
        // @UsePipes(new userValidation(UpdateOurServiceSchema))
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async updateService(
            @Body()
            updateDto: UpdateDto,
            @Param('id') id: string
        ){
            return this.serviceService.updateService(updateDto, +id)
        }

        // Delete service
        @Delete(':id')
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async deleteOne(
            @Param('id') id: string
        ): Promise<{}>{
            await this.serviceService.deleteService(+id);
            return {message: 'Service deleted successfully.'}
        }
    
}
