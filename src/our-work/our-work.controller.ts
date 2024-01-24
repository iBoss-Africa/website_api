import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OurWorkService } from './our-work.service';
import { CreateOurWorkDto } from './dto/create-our-work.dto';
import { UpdateOurWorkDto } from './dto/update-our-work.dto';

@Controller('our-work')
export class OurWorkController {
    constructor(private readonly ourWorkService: OurWorkService) { }

    @Post()
    create(@Body() createOurWorkDto: CreateOurWorkDto) {
        return this.ourWorkService.create(createOurWorkDto);
    }

    @Get()
    findAll() {
        return this.ourWorkService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ourWorkService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOurWorkDto: UpdateOurWorkDto) {
        return this.ourWorkService.update(+id, updateOurWorkDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ourWorkService.remove(+id);
    }
}
