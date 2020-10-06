
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {

      const date = createUserDto.dateOfBirth.split('/')
      const birth = `${date[2]}/${date[1]}/${date[0]}`
      const newDate = new Date(birth)
      createUserDto.dateOfBirth = newDate.toString();
    const user = await this.usersService.createUser(createUserDto);
    return {
      user,
      message: 'Aluno cadastrado com sucesso',
    };
  }

  
}