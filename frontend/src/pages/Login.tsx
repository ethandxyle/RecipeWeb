import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { getApiError } from '../api/api';
import { useAuth } from '../Context/auth';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { user, loading, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.from === '/submit-recipe' ? '/submit-recipe' : '/recipes';

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setError('');
        try {
            await login(username.trim(), password);
            navigate(destination, { replace: true });
        } catch (error) {
            setError(getApiError(error, 'Login failed. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <CircularProgress aria-label="Checking session" />;
    if (user) return <Navigate to={destination} replace />;

    return (
        <Stack component="form" spacing={2} onSubmit={handleLogin} sx={{ maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h4" component="h1">Login</Typography>
            {location.state?.registered && <Alert severity="success">Account created. You can now log in.</Alert>}
            {location.state?.from === '/submit-recipe' && <Alert severity="info">Log in to share a recipe.</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Username" value={username} required autoComplete="username" onChange={event => setUsername(event.target.value)} />
            <TextField label="Password" value={password} required autoComplete="current-password" type="password" onChange={event => setPassword(event.target.value)} />
            <Button variant="contained" type="submit" disabled={submitting}>{submitting ? 'Logging in…' : 'Login'}</Button>
        </Stack>
    );
}
