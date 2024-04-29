import { UrlModel } from "src/domain/model/url.model";

export class UrlPresenter {
    readonly id: string;
    readonly path: string;
    readonly accesses: number;
    readonly statusCode: number;
    readonly responseBody: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(urlModel: UrlModel) {
        this.id = urlModel.id;
        this.path = urlModel.path;
        this.accesses = urlModel.accesses;
        this.statusCode = urlModel.statusCode;
        this.responseBody = urlModel.responseBody;
        this.createdAt = urlModel.createdAt;
        this.updatedAt = urlModel.updatedAt;
    }
}