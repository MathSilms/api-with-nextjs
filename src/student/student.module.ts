
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { StudentsService } from './Students.service';
import { StudentsController } from './Students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports:[]
})
export class UsersModule {}