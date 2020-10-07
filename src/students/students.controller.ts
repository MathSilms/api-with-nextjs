
import { Controller, Post, Body, Get, Param, Patch, ForbiddenException, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { ReturnStudentDto } from './dtos/return-student.dto';
import { Student } from './student.entity';
import { UpdateStudentDto } from './dtos/update.student.dto';
import { GetStudent } from './getStudentDecorator';
//import { AdressService } from 'src/adress/adress.service';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService, 
    //private adressService:AdressService
    )
     {}

  @Post()
  async createStudents(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<ReturnStudentDto> {
    const student = await this.studentsService.createStudent(createStudentDto);
    return {
      student,
      message: 'Aluno cadastrado com sucesso',
    };
  }
  //http://localhost:3000/students/Coloque-aqui-o-ID-do-aluno
  @Get(':id')
  async findUserById(@Param('id') id): Promise<ReturnStudentDto> {
    const student = await this.studentsService.findUserById(id);
    //const adress = await this.adressService.find
    return {
      message: 'Aluno encontrado com sucesso!',
      student,
    };
  }

  @Patch(':id')
  async updateStudent(
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
    @GetStudent() student: Student,
    @Param('id') id: string,
  ) {
    const students = await this.studentsService.findUserById(id)

    // parei aqui !!!!!!!!!!!!!!!!!!!!!!
    if (students.id != id) {
      throw new ForbiddenException(
        'Você não tem autorização para editar esse aluno',
      );
    } else {
      return this.studentsService.updateUser(updateStudentDto, id);
    }
  }

}