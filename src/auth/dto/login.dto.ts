import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"


export class LoginDto{

    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter correct email address'})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @Length(8,12)
    readonly password: string 
}