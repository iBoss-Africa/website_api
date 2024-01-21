import { Prisma, Role } from "@prisma/client";

export class Users implements Prisma.UserCreateInput{
    email: string;
    name: string;
    password: string;
    role: Role;
}