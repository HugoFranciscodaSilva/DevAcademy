import { IsNotEmpty, IsString } from "class-validator";

export class CreateEnrollmentDto {
    @IsString({message:"O id do curso precisa ser string!"})
    @IsNotEmpty({message:"O id do curso não pode ser vazio!"})
    courseId:string
}
