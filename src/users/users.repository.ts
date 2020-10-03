
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const { name, cpf, dateOfBirth } = createUserDto;


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