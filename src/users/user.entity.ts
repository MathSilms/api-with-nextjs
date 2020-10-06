
import { Adress } from 'src/adress/adress.entity';
import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,, OneToMany
  } from 'typeorm';
  
  @Entity()
  @Unique(['cpf'])
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false })
    dateOfBirth: string;
    
    @Column({ nullable: false, type: 'varchar', length: 200 })
    cpf: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Adress, adress => Adress.user)
    adress: Adress;
  }