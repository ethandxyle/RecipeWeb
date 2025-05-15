export interface AuthForm {
    username: string;
    password: string;
}

export interface AuthResponse {
    id: number;
    username: string;
    // Add more fields if returned from backend
}

const API_BASE = 'http://localhost:8080/api/auth';

export const registerUser = async (form: AuthForm): Promise<void> => {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    });
    if (!res.ok) throw new Error('Register failed');
};

export const loginUser = async (form: AuthForm): Promise<AuthResponse> => {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
};
