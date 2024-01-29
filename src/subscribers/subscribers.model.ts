import { Prisma } from "@prisma/client";

export class Subscribers implements Prisma.SubscribersCreateInput{
    email: string;
}

 