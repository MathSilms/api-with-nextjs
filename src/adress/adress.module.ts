import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdressRepository } from './adress.repository';
import { AdressService } from './adress.service';
import { AdressController } from './adress.controller';
import { StudentRepository } from 'src/students/students.repository';

@Module({
    imports:[TypeOrmModule.forFeature([AdressRepository,StudentRepository])],
    providers:[AdressService],
    controllers:[AdressController],
    exports:[]
})

export class AdressModule {}
  
