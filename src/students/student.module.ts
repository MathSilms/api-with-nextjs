
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { StudentsService } from './Students.service';
import { StudentsController } from './Students.controller';
import { AdressRepository } from 'src/adress/adress.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository, AdressRepository])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[]
})
export class StudentsModule {}