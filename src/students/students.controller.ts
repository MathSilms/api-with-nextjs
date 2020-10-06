
import { Controller, Post, Body } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { ReturnStudentDto } from './dtos/return-student.dto';

@Controller('users')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  async createUser(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<ReturnStudentDto> {

      const date = createStudentDto.dateOfBirth.split('/')
      const birth = `${date[2]}/${date[1]}/${date[0]}`
      const newDate = new Date(birth)
      createStudentDto.dateOfBirth = newDate.toString();
    const student = await this.studentsService.createUser(createStudentDto);
    return {
      student,
      message: 'Aluno cadastrado com sucesso',
    };
  }

  
}