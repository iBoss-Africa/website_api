import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OurWorkDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string

    @ApiProperty()
    @IsString()
    readonly image: string

    readonly userId: number
}
