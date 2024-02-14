import { Prisma, Website } from "@prisma/client";

export class OurWork implements Prisma.OurWorkCreateInput {
    title: string;
    description: string;
    image: string;
    userId: number;
    website: Website;
}