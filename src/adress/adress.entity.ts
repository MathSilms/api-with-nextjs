

import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';
  import { Student } from 'src/students/student.entity';
  
  @Entity()
 
  export class Adress extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    street: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    number: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    complement: string;
  
    @Column({ nullable: false, default: true })
    neighborhood: string;
  
    @Column({ nullable: false })
    student_id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Student, student => student.adress)
    student: Student;
  }