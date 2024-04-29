import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UseCasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { AddUserUseCases } from "src/usecases/user/add-user.usecases";
import { AddUserDto } from "./user.dto";
import { UserPresenter } from "./user.presenter";
import { GetAllUsersUseCases } from "src/usecases/user/get-all-users.usecases";
import { FindUserByIdUseCases } from "src/usecases/user/find-user-by-id.usecases";

@Controller("users")
export class UserController {
    constructor(
        @Inject(UseCasesProxyModule.POST_USER_USECASES_PROXY)
        private readonly addUserUseCasesProxy: UseCaseProxy<AddUserUseCases>,

        @Inject(UseCasesProxyModule.GET_ALL_USERS_USECASES_PROXY)
        private readonly getAllUsersUseCasesProxy: UseCaseProxy<GetAllUsersUseCases>,

        @Inject(UseCasesProxyModule.GET_USER_BY_ID_USECASES_PROXY)
        private readonly getUserByIdUseCasesProxy: UseCaseProxy<FindUserByIdUseCases>,
    ) {}

    @Post()
    async addUser(@Body() addUserDto: AddUserDto) {
        const { name, email, password } = addUserDto;
        const { id } = await this.addUserUseCasesProxy.getInstance().execute(name, email, password);
        const userCreated = await this.getUserByIdUseCasesProxy.getInstance().execute(id);
        return new UserPresenter(userCreated);
    }

    @Get()
    async findAll() {
        const result = await this.getAllUsersUseCasesProxy.getInstance().execute();
        return result.map(userModel => new UserPresenter(userModel));
    }
}