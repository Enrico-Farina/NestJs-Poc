import { IsEmail, IsNotEmpty } from "class-validator";

export class UserSigIn {

    @IsEmail(undefined, { message: 'O email é inválido.' })
    email: string;

    @IsNotEmpty()
    password: string;
}