import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: string;
    name: string;
    cpf: string;
    dateOfBirth: string;
    salt: string;
    confirmationToken: string;
    recoverToken: string;
    createdAt: Date;
    updatedAt: Date;
}
