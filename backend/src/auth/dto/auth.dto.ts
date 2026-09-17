import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export type AuthenticatedUser = {
    id:string
    name:string
    email:string
    role:string
}

export class AuthDTO{
    @IsEmail({},{message:"Insira um email válido!"})
    @IsNotEmpty({message:"O email não pode ser um campo vazio!"})
    email:string

    @IsString({message:"A senha precisa ser um texto!"})
    @IsNotEmpty({message:"A senha não pode ficar vazia!"})
    @MinLength(6,{message:"A senha precisa ter ao menos 6 caracteres!"})
    password:string
}