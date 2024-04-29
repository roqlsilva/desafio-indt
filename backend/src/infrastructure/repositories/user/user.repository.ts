import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/domain/repositories/user-repository.interface";
import { UserEntity } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { UserModel } from "src/domain/model/user.model";

@Injectable()
export class DatabaseUserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>
    ) {}

    async create(data: UserModel): Promise<UserModel> {
        const entity = this.toUserEntity(data);
        const result = await this.userEntityRepository.insert(entity);
        return this.toUserModel(result.generatedMaps[0] as UserEntity);
    }

    async findAll(): Promise<UserModel[]> {
        const result = await this.userEntityRepository.find();
        return result.map(entity => this.toUserModel(entity));
    }

    async findById(id: string): Promise<UserModel> {
        const result = await this.userEntityRepository.findOneBy({id});
        return this.toUserModel(result);
    }

    async getUserByUsername(username: string): Promise<UserModel> {
        const result = await this.userEntityRepository.findOneBy({email: username});
        return result;
    }

    private toUserEntity(data: UserModel): UserEntity {
        const user = new UserEntity();

        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.createdAt = data.createdAt;
        user.updatedAt = data.updatedAt;

        return user;
    }
    
    private toUserModel(data: UserEntity): UserModel {
        const user = new UserModel();

        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.password = data.password;
        user.createdAt = data.createdAt;
        user.updatedAt = data.updatedAt;

        return user;
    }
}