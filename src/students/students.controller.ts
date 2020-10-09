
import { Controller, Post, Body, Get, Param, Put, ForbiddenException, ValidationPipe } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { ReturnStudentDto } from './dtos/return-student.dto';
import { Student } from './student.entity';
import { UpdateStudentDto } from './dtos/update.student.dto';
import { GetStudent } from './getStudentDecorator';
import { Adress } from 'src/adress/adress.entity';
import { AdressService } from 'src/adress/adress.service';
import { AdressRepository } from 'src/adress/adress.repository';
import { AdressStudentDto } from './dtos/adress.student.dto';

@Controller('student')
export class StudentsController {
  constructor(
    private studentsService: StudentsService,        
    private adressService:AdressService,
    private adressRepository:AdressRepository
    ){}

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

  //Método Get : http://localhost:3000/Coloque-aqui-o-ID-do-aluno/adress

  @Get(':id/adress')
    async findAdressStudent(
      @Param('id') id:string
    ){
       return await this.studentsService.findAdressStudent(id)
    }

    //Método Get : http://localhost:3000/students/nota-do-aluno/criterio/parametro '<' ou '>'
    @Get(':note/criterio/:param')
    async FindNotes(
      @Param('note') 
      note:string,
      @Param('param') param:string
    ){
      return this.studentsService.FindNotes(note.toString(),param)
    }
    
     @Get('media')
       async CalcNotes(){
        return this.studentsService.CalcNotes()
       }
    }