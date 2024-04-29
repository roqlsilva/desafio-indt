import { Body, Controller, Inject, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UseCasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { LoginUseCases } from "src/usecases/auth/login.usecases";
import { AuthLoginDto } from "./auth.dto";
import { LocalAuthGuard } from "src/infrastructure/common/guards/local.guard";

@Controller("/auth")
export class AuthController {
    constructor(
        @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
        private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>
    ) {}

    @Post('login')
    async login(@Body() auth: AuthLoginDto) {
        const result = await this.loginUseCaseProxy.getInstance().authenticateUserByUsernameAndPassword(auth.username, auth.password);
        if (!result) {
            throw new UnauthorizedException();
        }
        return result;
    }
}