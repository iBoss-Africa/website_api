import { Prisma, Website } from "@prisma/client";


export class OurService implements Prisma.OurServiceCreateInput {
    title: string;
    description: string;
    image: string;
    userId: number;
    website: Website;
}
