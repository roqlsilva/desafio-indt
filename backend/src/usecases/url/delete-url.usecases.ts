import { IUrlRepository } from "src/domain/repositories/url-repository.interface";

export class DeleteUrlUseCases {
    constructor(
        private readonly urlRepository: IUrlRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.urlRepository.delete(id);
    }
}