import { DynamicModule, Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { AddUserUseCases } from 'src/usecases/user/add-user.usecases';
import { GetAllUsersUseCases } from 'src/usecases/user/get-all-users.usecases';
import { FindUserByIdUseCases } from 'src/usecases/user/find-user-by-id.usecases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { JwtModule } from '../services/jwt/jwt.module';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { DatabaseUrlRepository } from '../repositories/url/url.repository';
import { AddUrlUseCases } from 'src/usecases/url/add-url.usecases';
import { GetUrlUseCases } from 'src/usecases/url/get-url.usecases';

@Module({
    imports: [
        EnvironmentConfigModule,
        RepositoriesModule,
        JwtModule
    ]
})
export class UseCasesProxyModule {
    //Auth
    static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';

    //Url
    static POST_URL_USECASES_PROXY = "postUrlUseCasesProxy";
    static GET_URL_USECASES_PROXY = "getUrlUseCasesProxy";
    
    //User
    static POST_USER_USECASES_PROXY = 'postUserUseCasesProxy';
    static GET_ALL_USERS_USECASES_PROXY = 'getAllUsersUseCasesProxy';
    static GET_USER_BY_ID_USECASES_PROXY = 'getUserByIdUseCasesProxy';
    
    static register(): DynamicModule {
        return {
            module: UseCasesProxyModule,
            providers: [
                {
                    inject: [JwtTokenService, EnvironmentConfigService, DatabaseUserRepository],
                    provide: UseCasesProxyModule.LOGIN_USECASES_PROXY,
                    useFactory: (
                        jwtService: JwtTokenService,
                        config: EnvironmentConfigService,
                        userRepo: DatabaseUserRepository,
                    ) => new UseCaseProxy(new LoginUseCases(jwtService, config, userRepo)),
                },
                {
                    inject: [DatabaseUserRepository],
                    provide: UseCasesProxyModule.POST_USER_USECASES_PROXY,
                    useFactory: (userRepository: DatabaseUserRepository) => 
                        new UseCaseProxy(new AddUserUseCases(userRepository)),
                },
                {
                    inject: [DatabaseUserRepository],
                    provide: UseCasesProxyModule.GET_ALL_USERS_USECASES_PROXY,
                    useFactory: (userRepository: DatabaseUserRepository) => 
                        new UseCaseProxy(new GetAllUsersUseCases(userRepository)),
                },
                {
                    inject: [DatabaseUserRepository],
                    provide: UseCasesProxyModule.GET_USER_BY_ID_USECASES_PROXY,
                    useFactory: (userRepository: DatabaseUserRepository) => 
                        new UseCaseProxy(new FindUserByIdUseCases(userRepository)),
                },
                {
                    inject: [DatabaseUrlRepository],
                    provide: UseCasesProxyModule.POST_URL_USECASES_PROXY,
                    useFactory: (urlRepository: DatabaseUrlRepository) =>
                        new UseCaseProxy(new AddUrlUseCases(urlRepository)),
                },
                {
                    inject: [DatabaseUrlRepository],
                    provide: UseCasesProxyModule.GET_URL_USECASES_PROXY,
                    useFactory: (urlRepository: DatabaseUrlRepository) =>
                        new UseCaseProxy(new GetUrlUseCases(urlRepository)),
                }
            ],
            exports: [
                UseCasesProxyModule.LOGIN_USECASES_PROXY,
                UseCasesProxyModule.POST_USER_USECASES_PROXY,
                UseCasesProxyModule.GET_ALL_USERS_USECASES_PROXY,
                UseCasesProxyModule.GET_USER_BY_ID_USECASES_PROXY,
                UseCasesProxyModule.POST_URL_USECASES_PROXY,
                UseCasesProxyModule.GET_URL_USECASES_PROXY,
            ]
        }
    }
}
