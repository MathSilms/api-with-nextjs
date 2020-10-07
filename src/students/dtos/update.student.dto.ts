
import { IsString, IsOptional, IsNumber  } from 'class-validator';
export class UpdateStudentDto {
  @IsOptional()
  @IsString({
    message: 'Informe um nome de aluno',
  })
  name: string;

  @IsOptional()
  @IsString(
    {
      message: 'Informe uma data válida',
    },
  )
  dateOfBirth: string;

  @IsOptional()
  @IsNumber()
  note: number;
}