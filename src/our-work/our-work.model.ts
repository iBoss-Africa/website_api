import { Prisma } from "@prisma/client";

export class OurWork implements Prisma.UserCreateInput {
    title: string;
    description: string;
    image: string;
}