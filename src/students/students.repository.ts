
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
    // ainda está incompleto a lógica da data !!! Terminar depois, se der tempo

    // const date = createStudentDto.dateOfBirth.split('/')
    // const birth = `${date[2]}/${date[1]}/${date[0]}`
    // const newDate = new Date(birth);
    
    const student = this.create();
    student.name = name;
    student.dateOfBirth = dateOfBirth;
    student.cpf = cpf;
    
    try {
      await student.save();
      
      return student;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('cpf já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o aluno no banco de dados',
        );
      }
    }
  }
}