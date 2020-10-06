
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdressRepository } from './adress.repository';
import { CreateAdressDto  } from './dtos/create-adress.dtos';
import { Adress } from './adress.entity';
import { StudentRepository } from 'src/students/students.repository';

@Injectable()
export class AdressService {
  constructor(
    @InjectRepository(AdressRepository)
    private adressRepository: AdressRepository,
    @InjectRepository(StudentRepository)
    private studentRepository:StudentRepository
    
  ) {}
  
  async createAdress(createAdressDto: CreateAdressDto): Promise<Adress> {
    const student = await this.studentRepository.findOne({where:{student_id:Number}})
    if (student) {
      return this.adressRepository.CreateAdress(createAdressDto);
    } else {
      throw new UnprocessableEntityException('O aluno não Existe');
    }
  }
}