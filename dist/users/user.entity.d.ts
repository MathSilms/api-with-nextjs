import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    cpf: string;
    name: string;
    role: string;
    status: boolean;
    password: string;
    salt: string;
    confirmationToken: string;
    recoverToken: string;
    createdAt: Date;
    updatedAt: Date;
}
