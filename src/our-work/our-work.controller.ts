import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { OurWorkService } from './our-work.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OurWorkDto } from './dto/create-our-work.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { WebsiteFlag } from 'src/interceptors/website-flag.interceptor';

@Controller('our-work')
@UseInterceptors(WebsiteFlag)
export class OurWorkController {
    constructor(private readonly ourWorkService: OurWorkService) { }


    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN')
    create(@Body() createOurWorkDto: OurWorkDto, @CurrentUser() user: User, @Query('website') website: string) {
        return this.ourWorkService.create(createOurWorkDto, user, website);
    }

    @Get()
    findAll(@Query('website') website: string) {
        return this.ourWorkService.findAll(website);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Query('website') website: string) {
        return this.ourWorkService.findOne(+id, website);
    }

    @Patch(':id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() OurWorkDto: OurWorkDto, @Query('website') website: string) {
        return this.ourWorkService.update(+id, OurWorkDto, website);
    }

    @Delete(':id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string, @Query('website') website: string) {
        return this.ourWorkService.remove(+id, website);
    }
}
