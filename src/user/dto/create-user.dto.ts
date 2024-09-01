import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {

    @IsString()
    @Length(1,50)
    name:string;

    @IsEmail()
    @Length(2,50)
    email:string;

    @IsStrongPassword({
        minLength:8,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
        minLowercase:1
    })
    password:string;
}
