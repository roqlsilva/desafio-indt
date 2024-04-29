import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UseCasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { LoginUseCases } from "src/usecases/auth/login.usecases";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(UseCasesProxyModule.LOGIN_USECASES_PROXY)
        private readonly loginUseCasesProxy: UseCaseProxy<LoginUseCases>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        console.log(payload);
        const user = await this.loginUseCasesProxy.getInstance().validateUserForJwtStrategy(payload.username);
        console.log(user);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}