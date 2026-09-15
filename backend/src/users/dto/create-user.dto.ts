import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

enum Role{
    Student = 'Student',
    Instructor = 'Instructor'
}

export class CreateUserDto {
    @IsString({message:"O nome precisa ser um texto!"})
    @IsNotEmpty({message:"O nome não pode ficar vazio!"})
    name:string

    @IsEmail({},{message:"Insira um email válido!"})
    @IsNotEmpty({message:"O email não pode ser um campo vazio!"})
    email:string

    @IsString({message:"A senha precisa ser um texto!"})
    @IsNotEmpty({message:"A senha não pode ficar vazia!"})
    @MinLength(6,{message:"A senha precisa ter ao menos 6 caracteres!"})
    password:string

    @IsEnum(Role,{message:"Insira um cargo válido!"})
    @IsNotEmpty()
    @IsOptional()
    role:'Student' | 'Instructor'
}
