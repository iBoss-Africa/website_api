import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from './users.model';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update.dto';
// import { Query } from 'express-serve-static-core';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService) { }

    // View all admin
    async getAllUser(): Promise<Users[]> {
        return await this.prisma.user.findMany();
    }

    // View deleted admins
    async viewTrash(): Promise<Users[]> {
        return await this.prisma.user.findMany({ where: { isDeleted: true } });
    }

    // Creating new Admin
    async newUser(signUpDto: SignUpDto, user: User): Promise<User> {
        const { name, email, password } = signUpDto;

        // Check if email already exist
        const userExist = await this.prisma.user.findUnique({ where: { email } });

        if (userExist) {
            throw new ConflictException('Email already exist.');
        }
        // hashing Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user
        const newUser = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return newUser;
    }


    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        // check is user exist
        const user = await this.prisma.user.findFirst({
            where: { email, isDeleted: false }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid email or passwor.');
        }

        // check if password is correct or not
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invali email or password');
        }

        // Generate token
        const token = await APIFeatures.assignJwtToken(user, this.jwtService);

        return { token }
    }

    // Edit user profile
    async editProfile(id: number, user: User, updateUserDto: UpdateUserDto) {
        const { email, name } = updateUserDto;

        // confirm ownership
        if (id != user.id) {
            throw new NotFoundException('User not found.');
        } else {
            return await this.prisma.user.update({ where: { id: user.id }, data: { email, name } });
        }
    }

    // Soft delete user
    async trash(id: number, user: User) {
        // Check if the use exist
        const isExist = await this.prisma.user.findUnique({ where: { id: id, isDeleted: false } });

        if (!isExist) {
            throw new NotFoundException('User not found.');
        }

        if (user.role === 'SUPER_ADMIN') {
            return await this.prisma.user.update({ where: { id: id }, data: { isDeleted: true } })
        } else {
            throw new UnauthorizedException('You are not allowed to do that.')
        }
    }


    // Restore admin
    async restore(id: number, user: User): Promise<{}> {
        // find the user to restore.
        const isExist = await this.prisma.user.findFirst({ where: { id: id, isDeleted: true } });
        if (!isExist) {
            throw new NotFoundException('User not found.');
        }

        // Only an admin can restore a soft deleted user;
        if (user.role === 'SUPER_ADMIN') {
            return await this.prisma.user.update({ where: { id: id }, data: { isDeleted: false } })
        } else {
            throw new UnauthorizedException('you are not allowed to do that.')
        }
    }


    // Permanent Delete
    async delete(id: number, user: User) {
        // Check if the use exist
        const isExist = await this.prisma.user.findUnique({ where: { id: id, isDeleted: true } });
        if (!isExist) {
            throw new NotFoundException('user not found.');
        }

        if (user.role === 'SUPER_ADMIN') {
            return await this.prisma.user.delete({ where: { id: id } })
        }
    }
}
