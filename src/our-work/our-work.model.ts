import { Prisma } from "@prisma/client";

export class OurWork implements Prisma.Our_WorkCreateInput {
    title: string;
    description: string;
    image: string;
}