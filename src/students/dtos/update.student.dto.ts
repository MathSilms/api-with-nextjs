
import { IsString, IsEmail, IsOptional } from 'class-validator';
export class UpdateStudentDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de aluno',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Informe um endereço de email válido',
    },
  )
  dateOfBirth: string;
}