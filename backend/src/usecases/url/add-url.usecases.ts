import { UrlModel } from "src/domain/model/url.model";
import { IUrlRepository } from "src/domain/repositories/url-repository.interface";

export class AddUrlUseCases {
    constructor(
        private readonly urlRepository: IUrlRepository
    ) {}

    async execute(path: string): Promise<UrlModel> {
        const url = new UrlModel();

        url.path = path;

        const result = this.urlRepository.create(url);
        return result;
    }
}