
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { ReturnStudentDto } from './dtos/return-student.dto';
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
    const student = await this.studentsService.createUser(createStudentDto);
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
}