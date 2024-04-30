import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUrlRepository } from "src/domain/repositories/url-repository.interface";
import { UrlModel } from "src/domain/model/url.model";
import { UrlEntity } from "src/infrastructure/entities/url.entity";

@Injectable()
export class DatabaseUrlRepository implements IUrlRepository {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlEntityRepository: Repository<UrlEntity>
    ) {}

    async create(data: UrlModel): Promise<UrlModel> {
        const entity = this.toUrlEntity(data);
        const result = await this.urlEntityRepository.insert(entity);
        return this.toUrlModel(result.generatedMaps[0] as UrlEntity);
    }

    async findAll(): Promise<UrlModel[]> {
        const result = await this.urlEntityRepository.find();
        return result.map(entity => this.toUrlModel(entity));
    }

    async findById(id: string): Promise<UrlModel> {
        const result = await this.urlEntityRepository.findOneBy({id});
        console.log(result);
        return this.toUrlModel(result);
    }

    async findUrlByPath(path: string): Promise<UrlModel> {
        const result = await this.urlEntityRepository.findOneBy({path});
        return result;
    }

    async delete(id: string): Promise<void> {
        await this.urlEntityRepository.delete(id);
    }

    async update(id: string, data: UrlModel): Promise<UrlModel> {
        await this.urlEntityRepository.update(id, data);
        return data;
    }

    private toUrlEntity(data: UrlModel): UrlEntity {
        const url = new UrlEntity();

        url.id = data.id;
        url.path = data.path;
        url.accesses = data.accesses;
        url.statusCode = data.statusCode;
        url.responseBody = data.responseBody;
        url.createdAt = data.createdAt;
        url.updatedAt = data.updatedAt;

        return url;
    }
    
    private toUrlModel(data: UrlEntity): UrlModel {
        const url = new UrlModel();

        url.id = data.id;
        url.path = data.path;
        url.accesses = data.accesses;
        url.statusCode = data.statusCode;
        url.responseBody = data.responseBody;
        url.createdAt = data.createdAt;
        url.updatedAt = data.updatedAt;

        return url;
    }
}