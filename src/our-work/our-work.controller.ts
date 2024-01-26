import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OurWorkService } from './our-work.service';
import { CreateOurWorkDto } from './dto/create-our-work.dto';
import { UpdateOurWorkDto } from './dto/update-our-work.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from '@prisma/client';

@Controller('our-work')
export class OurWorkController {
    constructor(private readonly ourWorkService: OurWorkService) { }

    
    @Post()
    // @UsePipes(new userValidation(OurServiceSchema))
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN') //You can pass multiple roles
    create(@Body() createOurWorkDto: CreateOurWorkDto,
    @CurrentUser() user: User) {
        return this.ourWorkService.create(createOurWorkDto, user);
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
