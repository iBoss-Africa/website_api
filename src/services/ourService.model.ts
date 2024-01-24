import { Prisma } from "@prisma/client";


export class OurService implements Prisma.Our_ServiceCreateInput{
    title: string;
    description: string;
    image: string;
    user: Prisma.UserCreateNestedOneWithoutOur_serviceInput;
}