import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { SubscribersDto } from './dto/subscribers.dto';
import { SubscribersService } from './subscribers.service';
import { subscriberSchema, userValidation } from 'src/utils/joi.validation';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('subscribers')
export class SubscribersController {
    constructor(private readonly subcriberService:SubscribersService){}

    // Get all subscribers
    @Get()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN', 'SUPER_ADMIN') 
    async getSubscribers(){
        return this.subcriberService.getSubscribers();
    }


    // Create new subscrber
    @Post()
    @UsePipes(new userValidation(subscriberSchema))
    async createSubscriber(
        @Body()
        subscribersDto:SubscribersDto
    ): Promise<{}>{
        return this.subcriberService.newSubscriber(subscribersDto);
    }

    // Delete Subscribers
    @Delete(':id')
    async delete(@Param('id') id: string){
        return this.subcriberService.delete(parseInt(id))
    }
    
}
