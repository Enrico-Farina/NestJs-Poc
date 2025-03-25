import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class UserUpdate {

    @IsOptional()
    email: string;

    @IsOptional()
    password: string;

    @IsOptional()
    name: string;
}