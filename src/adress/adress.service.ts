
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdressRepository } from './adress.repository';
import { CreateAdressDto  } from './dtos/create-adress.dtos';
import { Adress } from './adress.entity';
import { StudentRepository } from 'src/students/students.repository';
import { Student } from 'src/students/student.entity';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(AdressRepository)
    private adressRepository: AdressRepository,
    @InjectRepository(StudentRepository)
    private studentRepository:StudentRepository
    
  ) {}
  async findStudentById(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({id});

    if (!student) throw new NotFoundException('Aluno não encontrado');

    return student;
  }
   
  async createAdress(createAdressDto: CreateAdressDto, id: string): Promise<Adress> {
    const student = await this.findStudentById(id)
    console.log(student)
    if (student) {
      return this.adressRepository.CreateAdress(createAdressDto,student.id);
    } else {
      throw new UnprocessableEntityException('O aluno não Existe');
    }
  }

}