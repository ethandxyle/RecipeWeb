import { loginUser as login, registerUser as register } from '../api/api';
import type { User } from '../types';

export interface AuthForm {
    username: string;
    password: string;
}

export type AuthResponse = User;

export async function registerUser(form: AuthForm): Promise<void> {
    await register(form);
}

export async function loginUser(form: AuthForm): Promise<AuthResponse> {
    return (await login(form)).data;
}
