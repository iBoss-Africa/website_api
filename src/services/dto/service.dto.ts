import { IsDefined, IsEmpty, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"


export class ServiceDto {

    // @IsDefined()
    // @IsNotEmpty()
    // @IsString()
    // @Length(5, 255)
    readonly title: string;

    // @IsDefined()
    // @IsNotEmpty()
    // @IsString()
    readonly description: string;

    // @IsOptional()
    image: string;

    readonly userId: number;

}