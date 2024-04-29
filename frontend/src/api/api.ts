import axios, { AxiosResponse } from "axios";
import { PostType } from "../models/post.interface";
import { config } from "process";
import { usePersistentStorageValue } from "../hooks/usePersistentStorageValue";
import { LoginResponseType } from "../models/auth/login.interface";

export const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

// instance.interceptors.request.use(
//     config => {
//         const [token, setToken] = usePersistentStorageValue<LoginResponseType>('auth');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error);
//     }
// )

export const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Post = {
    getPosts: (): Promise<PostType[]> => requests.get('posts'),
    getPostById: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
    createPost: (post: PostType): Promise<PostType> => requests.post('posts', post),
    updatePost: (post: PostType, id: number): Promise<PostType> => requests.put(`posts/${id}`, post),
    deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};