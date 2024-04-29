import { UserModel } from "src/domain/model/user.model";

export class UserPresenter {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(userModel: UserModel) {
        this.id = userModel.id;
        this.name = userModel.name;
        this.email = userModel.email;
        this.password = userModel.password;
        this.createdAt = userModel.createdAt;
        this.updatedAt = userModel.updatedAt;
    }
}