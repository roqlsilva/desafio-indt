import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { JwtModule } from './infrastructure/services/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infrastructure/common/strategies/local.strategy';
import { UseCasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { JwtStrategy } from './infrastructure/common/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    EnvironmentConfigModule,
    ControllersModule,
    JwtModule,
    UseCasesProxyModule.register(),
  ],
  providers: [LocalStrategy, JwtStrategy],
})
export class AppModule {}
