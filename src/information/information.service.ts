import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OurWork } from './entities/ourWork.entity';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InformationService {
    constructor(
        @InjectRepository(OurWork)
        private ourWorkRepo: Repository<OurWork>,
        @InjectRepository(Service)
        private serviceRepo: Repository<Service>
    ){}


    create(service): Promise<Service>{
        const serviceObj = this.serviceRepo.create({
            title: service.title,
            description: service.description
        });

        return this.serviceRepo.save(serviceObj);
    }
}
