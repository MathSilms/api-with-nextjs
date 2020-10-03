
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({where:{ cpf:String }})
    if (userExist) {
      throw new UnprocessableEntityException('Usuário já existente');
    } else {

        



         /* stopped here >>*/ console.log(createUserDto.dateOfBirth.split('/'));

      return this.userRepository.createUser(createUserDto);
    }
  }
}