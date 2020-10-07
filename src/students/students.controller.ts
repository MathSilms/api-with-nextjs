
import { Controller, Post, Body, Get, Param, Put, ForbiddenException, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { ReturnStudentDto } from './dtos/return-student.dto';
import { Student } from './student.entity';
import { UpdateStudentDto } from './dtos/update.student.dto';
import { GetStudent } from './getStudentDecorator';
import { Adress } from 'src/adress/adress.entity';

@Controller('student')
export class StudentsController {
  constructor(private studentsService: StudentsService){}

    //Método POST : http://localhost:3000/student
    //Corpo: name,cpf, dateOfBirth, note 
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

  //Método GET : http://localhost:3000/student/Coloque-aqui-o-ID-do-aluno

  @Get(':id')
  async findStudentById(@Param('id') id): Promise<ReturnStudentDto> {
    const student = await this.studentsService.findStudentById(id);
    return {
      message: 'Aluno encontrado com sucesso!',
      student,
    };
  }

  //Método put : http://localhost:3000/Coloque-aqui-o-ID-do-aluno
  //Corpo : name, dateOfBirth, note. Cpf não pode ser editado.

  @Put(':id')
  async updateStudent(
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
    @GetStudent() student: Student,
    @Param('id') id: string,
  ) {
    const students = await this.studentsService.findStudentById(id)
    if (students.id != id) {
      throw new ForbiddenException(
        'Você não tem autorização para editar esse aluno',
      );
    } else {
      return this.studentsService.updateStudent(updateStudentDto, id);
    }
  }
  //Método get : http://localhost:3000/student
  @Get()
  async showStudents(){
     return await this.studentsService.showStudents()
  }

  @Get(':id+:adress')
    async findAdressStudent(
      @Param('id') id:string,
    ){
      return 'porra'
    }
}