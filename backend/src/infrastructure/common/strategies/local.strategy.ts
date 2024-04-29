import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UseCasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { LoginUseCases } from "src/usecases/auth/login.usecases";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
        private readonly loginUseCases: UseCaseProxy<LoginUseCases>
    ) {
        super();
    }

    async validate(username: string, password: string) {
        if (!username || !password) {
            throw new UnauthorizedException();
        }
        const user = await this.loginUseCases.getInstance().validateUserForLocalStrategy(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}