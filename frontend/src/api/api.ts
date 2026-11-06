import axios from 'axios';
import type { Recipe, User } from '../types';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

// A fresh token also handles login, logout, and expired sessions.
api.interceptors.request.use(async config => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method ?? '')) {
        const { data } = await api.get<{ token: string; headerName: string }>('/auth/csrf');
        config.headers.set(data.headerName, data.token);
    }
    return config;
});

export const fetchRecipes = () => api.get<Recipe[]>('/recipes');
export const addRecipe = (recipe: Omit<Recipe, 'id' | 'user'>) =>
    api.post<Recipe>('/recipes', recipe);
export const deleteRecipe = (id: number) => api.delete(`/recipes/${id}`);
export const registerUser = (data: { username: string; password: string }) =>
    api.post<User>('/auth/register', data);
export const loginUser = (data: { username: string; password: string }) =>
    api.post<User>('/auth/login', data);
export const fetchCurrentUser = () => api.get<User>('/auth/me');
export const logoutUser = () => api.post('/auth/logout');

export function getApiError(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data?.error === 'string') return data.error;
        if (typeof data?.message === 'string') return data.message;
        if (error.response?.status === 401) return 'Please log in to continue.';
        if (!error.response) return 'Cannot reach the server. Please try again.';
    }
    return fallback;
}
