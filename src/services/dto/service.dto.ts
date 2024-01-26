import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class ServiceDto {

 
    @IsNotEmpty()
    @IsString()
    @Length(5, 255)
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    image: string;

    readonly userId: number;

}