
import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreateAdressDto } from './dtos/create-adress.dtos';
import { AdressService } from './adress.service';
import { ReturnAdressDto } from './dtos/return-adress.dto';
import { StudentRepository } from 'src/students/students.repository';

@Controller('adress')
export class AdressController {
  constructor(private adressService: AdressService, private studentRepository:StudentRepository) {}

  //Método POST : http://localhost:3000/student/Coloque aqui id do usuário
   //Corpo: street,number,complement, neighborhood

  @Post(':id')
    async createAdress(
    @Param('id') id: string,
    @Body() createAdressDto: CreateAdressDto,
  ): Promise<ReturnAdressDto> {
    //const student = await this.adressService.findStudentById(id)
    const adress = await this.adressService.createAdress(createAdressDto,id);
    
    return {
    adress,
    student_id:adress.student_id,
      message: 'Endereço cadastrado com sucesso',
    };
  }
  

  
}