import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { UseCaseProxy } from "src/infrastructure/usecases-proxy/usecases-proxy";
import { UseCasesProxyModule } from "src/infrastructure/usecases-proxy/usecases-proxy.module";
import { AddUrlDto } from "./url.dto";
import { UrlPresenter } from "./url.presenter";
import { AddUrlUseCases } from "src/usecases/url/add-url.usecases";
import { GetUrlUseCases } from "src/usecases/url/get-url.usecases";
import { DeleteUrlUseCases } from "src/usecases/url/delete-url.usecases";
import { UpdateUrlUseCases } from "src/usecases/url/update-url.usecases";

@Controller("urls")
export class UrlController {
    constructor(
        @Inject(UseCasesProxyModule.POST_URL_USECASES_PROXY)
        private readonly addUrlUseCasesProxy: UseCaseProxy<AddUrlUseCases>,

        @Inject(UseCasesProxyModule.GET_URL_USECASES_PROXY)
        private readonly getUrlUseCases: UseCaseProxy<GetUrlUseCases>,

        @Inject(UseCasesProxyModule.DELETE_URL_USECASES_PROXY)
        private readonly deleteUrlUseCases: UseCaseProxy<DeleteUrlUseCases>,

        @Inject(UseCasesProxyModule.PUT_URL_USECASES_PROXY)
        private readonly updateUrlUseCases: UseCaseProxy<UpdateUrlUseCases>,
    ) {}

    @Post()
    async addUrl(@Body() addUrlDto: AddUrlDto) {
        const { path } = addUrlDto;
        const result = await this.addUrlUseCasesProxy.getInstance().execute(path);
        return new UrlPresenter(result);
    }

    @Get()
    async getAllUrls() {
        const result = await this.getUrlUseCases.getInstance().getAllUrls();
        return result;
    }

    @Get("/path/:path")
    async getUrlByPath(@Param("path") path: string) {
        const result = await this.getUrlUseCases.getInstance().getUrlByPath(path);
        return result;
    }

    @Get("/:id")
    async getUrlById(@Param("id") id: string) {
        const result = await this.getUrlUseCases.getInstance().getUrlById(id);
        return result;
    }

    @Delete("/:id")
    async DeleteUrlUseCases(@Param("id") id: string) {
        await this.deleteUrlUseCases.getInstance().execute(id);
    }

    @Put("/:id")
    async updateUrl(@Param("id") id: string, @Body() data: AddUrlDto) {
        const { path } = data;
        await this.updateUrlUseCases.getInstance().execute(id, path);
    }
}