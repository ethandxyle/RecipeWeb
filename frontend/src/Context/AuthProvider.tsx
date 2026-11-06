import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { fetchCurrentUser, loginUser, logoutUser } from '../api/api';
import type { User } from '../types';
import { AuthContext } from './auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        fetchCurrentUser()
            .then(response => { if (active) setUser(response.data); })
            .catch(() => { if (active) setUser(null); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    const login = async (username: string, password: string) => {
        const response = await loginUser({ username, password });
        setUser(response.data);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
