import { Prisma } from "@prisma/client";


export class SubscribersDto implements Prisma.SubscribersCreateInput{
    email: string;
}
