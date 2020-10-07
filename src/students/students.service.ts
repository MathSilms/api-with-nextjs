
import { Injectable, UnprocessableEntityException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update.student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentsRepository: StudentRepository,
    
  ) {}
  
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const studentExist = await this.studentsRepository.findOne({where:{ cpf:String }})
    if (studentExist) {
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

  async updateUser(updateStudentDto: UpdateStudentDto, id: string): Promise<Student> {
    const student = await this.findUserById(id);
    const { name, dateOfBirth, note } = updateStudentDto;
    student.name = name ? name : student.name;
    student.dateOfBirth = dateOfBirth ? dateOfBirth : student.dateOfBirth;
    student.note = note ? note : student.note;
    try {
      await student.save();
      return student;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}