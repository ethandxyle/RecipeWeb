import axios from 'axios';
import type { Recipe } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

export const fetchRecipes = () => api.get<Recipe[]>('/recipes');

export const addRecipe = (recipe: Omit<Recipe, 'id'>) =>
    api.post<Recipe>('/recipes', recipe);

export const deleteRecipe = (id: number) => api.delete(`/recipes/${id}`);

export const registerUser = (data: { username: string; password: string }) =>
    api.post('/auth/register', data);

export const loginUser = (data: { username: string; password: string }) =>
    api.post('/auth/login', data);
