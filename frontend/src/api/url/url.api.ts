import { requests } from "../api";

export interface PostUrl {
    path: string
}

export const Url = {
    findAll: () => requests.get('urls'),
    create: (data: PostUrl) => requests.post('urls', data),
    update: (id: string, data: PostUrl) => requests.put(`urls/${id}`, data),
    delete: (id: string) => requests.delete(`urls/${id}`),
}
