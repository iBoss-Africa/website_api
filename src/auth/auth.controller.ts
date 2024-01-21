import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from './users.model';
import { LoginSchema, UserSchema, userValidation } from 'src/utils/joi.validation';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

        
        @Get()
        async getAllUsers(): Promise<Users[]>{
            return await this.authService.getAllUser()
        }

        @Post('/')
        @UsePipes(new userValidation(UserSchema))
        async signup(
            @Body()
            signUpDto: SignUpDto): Promise<any>{
                const user = await this.authService.newUser(signUpDto);
                return user
        }

        @Post('/login')
        async login(
            @Body(new userValidation(LoginSchema) ) 
            loginDto:LoginDto
        ):Promise<{token: string}>{
            return this.authService.login(loginDto)
        }
}
