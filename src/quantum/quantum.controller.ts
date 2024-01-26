import { Controller, Body, Post, UsePipes, UseGuards, Get, Param,  Patch, Delete, Query,} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { OurServiceSchema, UpdateOurServiceSchema, userValidation } from 'src/utils/joi.validation';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { QuantumService } from './quantum.service';
import { QuantumServiceDto } from './dto/quantumService.dto';
import { UpdateDto } from './dto/update.dto';


@Controller('quantum/services')
export class QuantumController {
    constructor(private readonly quantumService : QuantumService){}

        // get all services created
        @Get()
        async getAll(
        ){
            return await this.quantumService.getAll();
        }

        // Get specific service
        @Get(':id')
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async getOne(@Param('id') id: string){
            return await this.quantumService.getOne(parseInt(id));
        }

        // Create new Service
        @Post('/')
        // @UsePipes(new userValidation(OurServiceSchema))
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async createNewService(
            @Body()
            QuantumServiceDto:QuantumServiceDto,
            @CurrentUser() user: User,

        ){
            return this.quantumService.newService(QuantumServiceDto, user)
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
            return this.quantumService.updateService(updateDto, +id)
        }

        // Delete service
        @Delete(':id')
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN') //You can pass multiple roles
        async deleteOne(
            @Param('id') id: string
        ): Promise<{}>{
            await this.quantumService.deleteService(+id);
            return {message: 'Service deleted successfully.'}
        }
    
}
