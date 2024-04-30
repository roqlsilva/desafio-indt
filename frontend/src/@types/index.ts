export interface IUrl {
    id: string;
    path: string;
    accesses: number;
    statusCode?: string;
    responseBody?: string;
    createdAt: Date;
    updatedAt: Date;
}