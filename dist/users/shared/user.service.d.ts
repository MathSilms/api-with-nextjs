import { User } from './user';
export declare class UserService {
    users: User[];
    getAll(): void;
    getById(id: number): void;
}
