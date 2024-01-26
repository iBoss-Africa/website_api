import { IsNotEmpty, IsString } from "class-validator";


export class CreateOurWorkDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsString()
    readonly image: string

    readonly userId: number
}
