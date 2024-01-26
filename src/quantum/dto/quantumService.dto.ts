import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class QuantumServiceDto{

 
    @IsNotEmpty()
    @IsString()
    @Length(5, 255)
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    image: string;

}