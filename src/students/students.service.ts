
import { Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { CreateStudentDto } from './dtos/create-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentsRepository: StudentRepository,
    
  ) {}
  
  async createUser(createStudentDto: CreateStudentDto): Promise<Student> {
    const userExist = await this.studentsRepository.findOne({where:{ cpf:String }})
    if (userExist) {
      throw new UnprocessableEntityException('Usuário já existente');
    } else {
      return this.studentsRepository.createStudent(createStudentDto);
    }
  }

  async findUserById(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({id});

    if (!student) throw new NotFoundException('Aluno não encontrado');

    return student;
  }
}