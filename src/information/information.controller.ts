import {Post, Body, Controller } from '@nestjs/common';
import { InformationService } from './information.service';

@Controller('information')
export class InformationController {
    constructor(private informationService: InformationService){}


    @Post()
    createService(@Body() body){
        return this.informationService.create(body)
    }
}
