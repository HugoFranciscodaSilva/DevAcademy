import { IsNotEmpty, IsString } from "class-validator"

export class CreateCourseDto {
    @IsString({message:"O nome do curso deve ser string!"})
    @IsNotEmpty({message:"O nome do curso não pode ser vazio!"})
    name:string

    @IsString({message:"A capa do curso deve ser string!"})
    @IsNotEmpty({message:"A capa do curso não pode ser vazio!"})
    cape:string

    @IsString({message:"A descrição do curso deve ser string!"})
    @IsNotEmpty({message:"A descrição do curso não pode ser vazia!"})
    description:string
}
