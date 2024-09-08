import { IsEmail,  Length } from "class-validator";

export class AuthForgetDTO{
    @IsEmail()
    @Length(2,50)
    email:string;
}