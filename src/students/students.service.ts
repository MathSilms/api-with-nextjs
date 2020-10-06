
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
}