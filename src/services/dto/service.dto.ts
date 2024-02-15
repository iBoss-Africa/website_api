import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class ServiceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(5, 255)
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsOptional()
    image: string;

    readonly userId: number;

    @IsOptional()
    @IsString()
    readonly website: string
}