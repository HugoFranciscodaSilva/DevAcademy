import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateLessonDto {
    @IsString({message:"O nome precisa ser string!"})
    @IsNotEmpty({message:"O nome não pode ser vazio!"})
    name:string

    @IsNumber()
    @IsNotEmpty({message:"A ordem não pode ser vazia!"})
    order:number

    @IsString({message:"A url do video precisa ser string!"})
    @IsNotEmpty({message:"A url do video não pode ser vazia!"})
    urlVideo:string

    @IsString({message:"A url da thumbnail precisa ser string!"})
    @IsNotEmpty({message:"A url da thumbnail não pode ser vazia!"})
    urlThumbnail:string

    @IsString({message:"O id do modulo precisa ser string!"})
    @IsNotEmpty({message:"O id do modulo não pode ser vazio!"})
    moduleId:string
}
