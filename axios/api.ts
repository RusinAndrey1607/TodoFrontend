import axios, { AxiosResponse } from "axios"
import { todoType } from "../components/Todo"

const instance = axios.create({
    baseURL: "https://stormy-beyond-27185.herokuapp.com/todos"
})

export const todoApi = {
    async getAll(): Promise<AxiosResponse<any, todoType[]>> {
        const todos = await instance.get("/")
        return todos
    },
    async getOne(id: number) {
        const todo = await instance.get(`/${id}`)
        return todo
    },
    async delete(id: number) {
        const todo = await instance.delete(`/${id}`)
        return todo
    },
    async create(body: any) {
        const todo = await instance.post(`/add`, body)
        return todo
    },
    async update(id: number, body: any) {
        const todo = await instance.put(`/${id}`, body)
        return todo
    }
}
