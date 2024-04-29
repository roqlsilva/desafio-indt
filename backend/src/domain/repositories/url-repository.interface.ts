import { UrlModel } from "../model/url.model";
import { UserModel } from "../model/user.model";

export interface IUrlRepository {
    create(data: UrlModel): Promise<UrlModel>;
    findAll(): Promise<UrlModel[]>;
    findById(id: string): Promise<UrlModel>;
    findUrlByPath(path: string): Promise<UrlModel>;
}