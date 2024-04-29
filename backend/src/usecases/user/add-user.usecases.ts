import { UserModel } from "src/domain/model/user.model";
import { IUserRepository } from "src/domain/repositories/user-repository.interface";

export class AddUserUseCases {
    constructor(
        private readonly userRepository: IUserRepository
    ) {}

    async execute(name: string, email: string, password: string): Promise<UserModel> {
        const user = new UserModel();

        user.name = name;
        user.email = email;
        user.password = password;

        const result = this.userRepository.create(user);
        return result;
    }
}