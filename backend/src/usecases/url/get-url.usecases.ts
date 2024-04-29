import { UrlModel } from "src/domain/model/url.model";
import { IUrlRepository } from "src/domain/repositories/url-repository.interface";

export class GetUrlUseCases {
    constructor(
        private readonly urlRepository: IUrlRepository
    ) {}

    async getUrlById(id: string): Promise<UrlModel> {
        const result = await this.urlRepository.findById(id);
        return result;
    }

    async getUrlByPath(path: string): Promise<UrlModel> {
        const result = await this.urlRepository.findUrlByPath(path);
        return result;
    }

    async getAllUrls(): Promise<UrlModel[]> {
        const result = await this.urlRepository.findAll();
        return result;
    }
}