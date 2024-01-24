import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';
// import { Query } from 'express-serve-static-core';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwtService: JwtService){}

    async getAllUser():Promise<Users[]>{
        return await this.prisma.user.findMany();
    }

    async newUser(signUpDto:SignUpDto):Promise<{token: string}>{
        const {name, email, password} = signUpDto;

        // Check if email already exist
        const userExist = await this.prisma.user.findUnique({where:{email}});
        
        if(userExist){
            throw new ConflictException('Email already exist.');
        }
        // hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

            // Creating new user
            const user =  await this.prisma.user.create({
                data: {
                    name,
                    email,
                    password:hashedPassword
                }
                });
            // Generate token
            const token = await APIFeatures.assignJwtToken(user, this.jwtService );

                return {token};
    }

    

    async login(loginDto:LoginDto): Promise<{token: string}>{
        const {email, password} = loginDto;

        // check is user exist
        const user = await this.prisma.user.findUnique({
            where:{email}
        });

        if(!user){
            throw new UnauthorizedException('Invalid email or passwor.');
        }

        // check if password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            throw new UnauthorizedException('Invali email or password');
        }

        // Generate token
        const token = await APIFeatures.assignJwtToken(user, this.jwtService );

        return {token}
    }
}
