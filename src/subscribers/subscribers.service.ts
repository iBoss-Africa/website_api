import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SubscribersDto } from './dto/subscribers.dto';

@Injectable()
export class SubscribersService {
    constructor(private prisma: PrismaService){}

    async getSubscribers(){
        return await this.prisma.subscribers.findMany();
    }
    async newSubscriber(subscribersDto:SubscribersDto ){
        const {email} = subscribersDto;

        // check if the ema il already exist
        const isExist = await this.prisma.subscribers.findUnique({where:{email: email}});

        if(isExist){
            throw new ConflictException('You are already a subcriber');
        }

        // Create a new subscriber
        return await this.prisma.subscribers.create({data: {email}});
    }

    // Delete a subascriber
    async delete(id: number){
        // find the id 
        const subscriber = await this.prisma.subscribers.findUnique({where:{id: id}});

        if(!subscriber){
            throw new NotFoundException('Usere not found')
        }

        return await this.prisma.subscribers.delete({where:{id: id}})
    }
}
