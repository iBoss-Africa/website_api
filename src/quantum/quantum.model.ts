import { Prisma } from "@prisma/client";

export class OurService implements Prisma.Our_ServiceCreateInput{
    userId: number;
    title: string;
    description: string;
    image: string;
}
