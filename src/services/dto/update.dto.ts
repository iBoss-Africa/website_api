import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";


export class UpdateDto {

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
}