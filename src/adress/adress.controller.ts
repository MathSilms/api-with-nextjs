
import { Controller, Post, Body } from '@nestjs/common';
import { CreateAdressDto } from './dtos/create-adress.dtos';
import { AdressService } from './adress.service';
import { ReturnAdressDto } from './dtos/return-adress.dto';

@Controller('adress')
export class AdressController {
  constructor(private adressService: AdressService) {}

  @Post()
    async createAdress(
    @Body() createAdressDto: CreateAdressDto,
  ): Promise<ReturnAdressDto> {
    const adress = await this.adressService.createAdress(createAdressDto);
    return {
    student_id:adress.student_id,
    adress,
      message: 'Endereço cadastrado com sucesso',
    };
  }
  

  
}