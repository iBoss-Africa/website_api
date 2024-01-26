import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";



export class SignUpDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
   readonly name: string

   @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email address'})
    readonly email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8,12)
    readonly password: string 

}