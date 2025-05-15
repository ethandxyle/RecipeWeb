export interface Recipe {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    category: string;
    cookingTime: number;
    difficulty: string;
}

export interface User {
    id: number;
    username: string;
    password: string;
}
