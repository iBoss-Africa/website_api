import { Injectable } from '@nestjs/common';
import { CreateOurWorkDto } from './dto/create-our-work.dto';
import { UpdateOurWorkDto } from './dto/update-our-work.dto';

@Injectable()
export class OurWorkService {
    create(createOurWorkDto: CreateOurWorkDto) {
        return 'This action adds a new ourWork';
    }

    findAll() {
        return `This action returns all ourWork`;
    }

    findOne(id: number) {
        return `This action returns a #${id} ourWork`;
    }

    update(id: number, updateOurWorkDto: UpdateOurWorkDto) {
        return `This action updates a #${id} ourWork`;
    }

    remove(id: number) {
        return `This action removes a #${id} ourWork`;
    }
}
