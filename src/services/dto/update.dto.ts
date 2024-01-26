import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { PartialType } from '@nestjs/mapped-types';
import { ServiceDto } from "./service.dto";

export class UpdateDto extends PartialType(ServiceDto){

 
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