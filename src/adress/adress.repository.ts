import {  EntityRepository, Repository } from 'typeorm';
import { Adress } from './adress.entity';
import { CreateAdressDto } from '../adress/dtos/create-adress.dtos';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Adress)
export class AdressRepository extends Repository<Adress> {
    async CreateAdress(
        createAdressDto: CreateAdressDto, student_id:string
      ): Promise<Adress> {

        const { complement,neighborhood,number,street } = createAdressDto;

        const adress = this.create();
        adress.complement = complement;
        adress.neighborhood = neighborhood;
        adress.number = number;
        adress.street = street
        adress.student_id = student_id ;

        try {
          await adress.save();
          return adress;

        } catch (error) {
          if (error.code.toString() === '23505') {
            throw new ConflictException('O endereço já foi cadastrado anteriormente');
          } else {
            throw new InternalServerErrorException(
              'Erro ao salvar o Endereço no banco de dados',
            );
          }
        }
    }
}

