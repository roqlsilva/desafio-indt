import { UrlModel } from "src/domain/model/url.model";
import { IUrlRepository } from "src/domain/repositories/url-repository.interface";

export class UpdateUrlUseCases {
    constructor(
        private readonly urlRepository: IUrlRepository
    ) {}

    async execute(id: string, path: string): Promise<UrlModel> {
        const url = new UrlModel();

        url.path = path;

        const result = this.urlRepository.update(id, url);
        return result;
    }
}