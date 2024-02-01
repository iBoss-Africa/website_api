import { Prisma } from "@prisma/client";

export class OurService implements Prisma.Our_Service_QuantumCreateInput{
    userId: number;
    title: string;
    description: string;
    image: string;
}
