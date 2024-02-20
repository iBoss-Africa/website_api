import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";



export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8,12)
    readonly oldPassword: string 
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8,12)
    readonly newPassword: string 

}