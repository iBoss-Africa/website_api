import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from './users.model';
import { LoginSchema, UserSchema, userValidation } from 'src/utils/joi.validation';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update.dto';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // view all admin
    @Get()
    @UseGuards(AuthGuard())
    async getAllUsers() {
        return await this.authService.getAllUser()
    }


    // new admin signup
    @Post('/')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('SUPER_ADMIN') //You can pass multiple roles
    @UsePipes(new userValidation(UserSchema))
    async signup(
        @Body()
        signUpDto: SignUpDto,
        @CurrentUser() user: User
    ): Promise<{ token: string }> {
        const newUser = this.authService.newUser(signUpDto, user);
        return newUser;
    }

    // Admin login
    @Post('/login')
    async login(
        @Body(new userValidation(LoginSchema))
        loginDto: LoginDto
    ): Promise<{ token: string }> {
        return this.authService.login(loginDto)
    }

    // Edit user profile
    @Patch(':id')
    @UseGuards(AuthGuard(), RolesGuard)
    async updateUser(
        @Body()
        updateUserDto: UpdateUserDto,
        @Param('id') id: string,
        @CurrentUser() user: User,
    ) {
        return this.authService.editProfile(parseInt(id), user, updateUserDto);
    }

    // View Trash
    @Get('trash')
    @UseGuards(AuthGuard())
    async viewtrash() {
        return await this.authService.viewTrash()
    }

    //Soft delete user
    @Delete('trash/:id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('ADMIN', 'SUPER_ADMIN') //You can pass multiple roles
    async trash(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.authService.trash(parseInt(id), user);
    }

    // Restore a soft deleted Admin
    @Put('restore/:id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('SUPER_ADMIN')
    async restore(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.authService.restore(parseInt(id), user);
    }

    // Permanant Delete
    @Delete('delete/:id')
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('SUPER_ADMIN') //You can pass multiple roles
    async delete(
        @Param('id') id: string,
        @CurrentUser() user: User
    ) {
        return this.authService.delete(parseInt(id), user);
    }
}
