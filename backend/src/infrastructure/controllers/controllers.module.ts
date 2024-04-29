import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { UrlController } from './url/url.controller';

@Module({
    imports: [UseCasesProxyModule.register()],
    controllers: [UserController, AuthController, UrlController]
})
export class ControllersModule {}
