import { Prisma, userRole } from "@prisma/client";

export class Users implements Prisma.UserCreateInput{
    id: number;
    email: string;
    name: string;
    password: string;
    role: userRole;
}

