

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
  import { User } from 'src/users/user.entity';
  
  @Entity()
  @Unique(['student_id'])
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
    student_id: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.adress)
    user: User;
  }