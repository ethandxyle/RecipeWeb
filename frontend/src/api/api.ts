import axios from 'axios';
import type { Recipe } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    // withCredentials: false,  // ensure this is false or omitted
    // If you want to send cookies or auth headers, enable this:
    // withCredentials: true,
});

// Fetch all recipes
export const fetchRecipes = () => api.get<Recipe[]>('/recipes');

// Add a new recipe
export const addRecipe = (recipe: Omit<Recipe, 'id'>) =>
    api.post<Recipe>('/recipes', recipe);

// Delete a recipe by ID
export const deleteRecipe = (id: number) =>
    api.delete(`/recipes/${id}`);

// Register a new user
export const registerUser = (data: { username: string; password: string }) =>
    api.post('/auth/register', data);

// Login user
export const loginUser = (data: { username: string; password: string }) =>
    api.post('/auth/login', data);

// Optional: Add interceptors to log errors (helpful for debugging)
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API call error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
