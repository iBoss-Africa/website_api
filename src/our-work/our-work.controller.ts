import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OurWorkService } from './our-work.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OurWorkDto } from './dto/create-our-work.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('our-work')
export class OurWorkController {
    constructor(private readonly ourWorkService: OurWorkService) { }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN')
    create(@Body() createOurWorkDto: OurWorkDto, @CurrentUser() user: User) {
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
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() updateOurWorkDto: OurWorkDto) {
        return this.ourWorkService.update(+id, updateOurWorkDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.ourWorkService.remove(+id);
    }
}
