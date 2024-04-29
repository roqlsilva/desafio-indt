import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DatabaseUserRepository } from './user/user.repository';
import { DatabaseUrlRepository } from './url/url.repository';
import { UrlEntity } from '../entities/url.entity';

@Module({
    imports: [
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([UserEntity, UrlEntity])
    ],
    providers: [DatabaseUserRepository, DatabaseUrlRepository],
    exports: [DatabaseUserRepository, DatabaseUrlRepository]
})
export class RepositoriesModule {}
