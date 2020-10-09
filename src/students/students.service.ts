
import { Injectable, UnprocessableEntityException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './students.repository';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update.student.dto';
import { Student } from './student.entity';
import { AdressRepository } from 'src/adress/adress.repository';
import { Adress } from 'src/adress/adress.entity';
import { AdressStudentDto } from './dtos/adress.student.dto';
import { json } from 'express';


@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentRepository)
    @InjectRepository(AdressRepository)
    private studentsRepository: StudentRepository,
    private adressRepository: AdressRepository,
    
  ) {}
  
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const studentExist = await this.studentsRepository.findOne({where:{ cpf:String }})
    if (studentExist) {
      throw new UnprocessableEntityException('Usuário já existente');
    } else {
      return this.studentsRepository.createStudent(createStudentDto);
    }
  }

  async findStudentById(id: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({id});

    if (!student) throw new NotFoundException('Aluno não encontrado');

    return student;
  }

  async updateStudent(updateStudentDto: UpdateStudentDto, id: string): Promise<Student> {
    const student = await this.findStudentById(id);
    const { name, dateOfBirth, note } = updateStudentDto;
    student.name = name ? name : student.name;
    student.dateOfBirth = dateOfBirth ? dateOfBirth : student.dateOfBirth;
    student.note = note ? note : student.note;
    try {
      await student.save();
      return student;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }

  async showStudents(){
    const students = await this.studentsRepository.find();
    console.log(students)
    return students
  }

   async findAdressStudent(id:string){
     const student = await this.findStudentById(id)
     if (!student) {
       throw new NotFoundException('Aluno não encontrado')
     } else{
       //const Adress = await this.adressRepository.find({ where:{student_id:id} }) 
       // Método findAndCount é mais apropriado
       //const Total = [` Total de endereços:${Adress.length}`, Adress]
       const Adress = await this.adressRepository.findAndCount({ where:{student_id:id} })
       if (!Adress) throw new NotFoundException('Endereço não Existe')
       const Total = [` Total de endereços:${Adress[1]}`, Adress[0]]
        return Total
     };
     
   }

    async FindNotes(note:string, param:string){
      if(param === '>'){
        //console.log(param)
        //parei aqui, executar rota pra ver retorno
        const student = await this.studentsRepository.find({select:['note']})
        // const n = student.map((n)=>{
        //   if(n.note > Number(note)) {
        //     return n
        //   }
        function findNote(value){
          console.log(value)
          return value.note > Number(note)
        }

        const n = student.filter(findNote)
        //console.log(n)
        return n

      }
      if(param === '<'){
        const student = await this.studentsRepository.find({select:['note']})
        function findNote(value){
          return value.note < Number(note)
        }

        const n = student.filter(findNote)
        return n
      }
      // Colocar um retorno com erro adequado se houver tempo.
      return JSON.stringify('Parâmetro não permitido')
    }

    async CalcNotes(){
      /// parei aqui /// 
      const student = await this.studentsRepository.find({select:['note']})
      const media = student.map((note)=>{
       })
    }
}