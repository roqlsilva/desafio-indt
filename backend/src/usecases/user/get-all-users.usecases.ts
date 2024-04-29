import { UserModel } from "src/domain/model/user.model";
import { IUserRepository } from "src/domain/repositories/user-repository.interface";

export class GetAllUsersUseCases {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(): Promise<UserModel[]> {
        return this.userRepository.findAll();
    }
}