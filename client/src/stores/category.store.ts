import { ICategoryData } from "@/interfaces/category.interface";
import { create } from "zustand";



export interface CategoryState {
    categories: ICategoryData[];
    saveCategoryData: (categories: ICategoryData[]) => void
}


export const useCategoryState = create<CategoryState>((set) => ({
    categories: [],
    saveCategoryData: (categories) => set(() => ({ categories: categories }))
}))