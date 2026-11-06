export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    category: string;
    cookingTime: number;
    difficulty: string;
    ingredients?: string;
    calories?: number;
    protein?: number;
    user?: User | null;
}

export interface User {
    id: number;
    username: string;
}
