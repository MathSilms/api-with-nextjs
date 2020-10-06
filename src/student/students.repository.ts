
import { EntityRepository, Repository } from 'typeorm';
import { Student } from './student.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async createStudent(
    createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    const { name, cpf, dateOfBirth } = createStudentDto;


    const user = this.create();
    user.name = name;
    user.dateOfBirth = dateOfBirth;
    user.cpf = cpf;
    
    try {
      await user.save();
      
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('cpf já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }
}