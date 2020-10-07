
import { Adress } from 'src/adress/adress.entity';
import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToMany
  } from 'typeorm';
  
  @Entity()
  @Unique(['cpf'])
  export class Student extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200  })
    dateOfBirth: string;
    
    @Column({ nullable: false, type: 'varchar', length: 200 })
    cpf: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    note: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Adress, adress => adress.student_id)
    adress: Adress;
  }