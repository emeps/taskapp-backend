import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO{
     @IsStrongPassword({
        minLength:8,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
        minLowercase:1
    })
    password:string;

    @IsJWT()
    token:string

}