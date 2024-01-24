import { Controller, Body, Post, UsePipes, UseGuards, Get, Query} from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { OurService } from './ourService.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('services')
export class ServicesController {
    constructor(private readonly serviceService : ServicesService){}

        // get all services created
        @Get()
        async getAll(
        ): Promise<OurService[]>{
            return await this.serviceService.getAll();
        }


        @Post('/')
        // @UsePipes(new userValidation(OurServiceSchema))
        @UseGuards(AuthGuard(), RolesGuard)
        @Roles('ADMIN', 'USER') //You can pass multiple roles
        async createNewService(
            @Body()
            serviceDto:ServiceDto,
            @CurrentUser() user: User,

        ){
            return this.serviceService.newService(serviceDto, user)
        }
            
    
}
