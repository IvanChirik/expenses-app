import { $api } from "@/http";
import { ICategoryData } from "@/interfaces/category.interface";
import { AxiosError } from "axios";

class CategoryService {

    private readonly CATEGORY_ENDPOINT = '/categories';

    async createCategory(title: string) {
        try {
            const { data: category } = await $api.post<ICategoryData>(this.CATEGORY_ENDPOINT, { title });
            return category;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findAll() {
        try {
            const { data: categories } = await $api.get<ICategoryData[]>(this.CATEGORY_ENDPOINT);
            return categories;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async findById(categoryId: number) {
        try {
            const { data: category } = await $api.get<ICategoryData>(`${this.CATEGORY_ENDPOINT}/:${categoryId}`);
            return category;
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async updateCategory(categoryId: number, title: string) {
        try {
            return await $api.patch(`${this.CATEGORY_ENDPOINT}/:${categoryId}`, { title });
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
    async deleteCategory(categoryId: number) {
        try {
            return await $api.delete(`${this.CATEGORY_ENDPOINT}/:${categoryId}`);
        } catch (error) {
            if (error instanceof AxiosError)
                throw new Error(error.response?.data.message)
        }
    }
}


export default new CategoryService();