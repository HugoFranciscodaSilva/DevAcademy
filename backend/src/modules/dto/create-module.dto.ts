import { IsNotEmpty, IsString } from "class-validator";

export class CreateModuleDto {
    @IsString({message:"O nome do modulo deve ser string!"})
    @IsNotEmpty({message:"O nome do modulo não pode ser vazio!"})
    name:string

    @IsString({message:"O id do curso deve ser string!"})
    @IsNotEmpty({message:"O id do curso não pode ser vazio!"})
    courseId:string
}
