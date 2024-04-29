import { UserModel } from "src/domain/model/user.model";
import { IUserRepository } from "src/domain/repositories/user-repository.interface";

export class FindUserByIdUseCases {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(id: string): Promise<UserModel> {
        return this.userRepository.findById(id);
    }
}