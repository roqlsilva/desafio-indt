import { UserModel } from "../model/user.model";

export interface IUserRepository {
    create(data: UserModel): Promise<UserModel>;
    findAll(): Promise<UserModel[]>;
    findById(id: string): Promise<UserModel>;
    getUserByUsername(username: string): Promise<UserModel>;
}