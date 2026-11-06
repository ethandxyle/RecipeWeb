import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, TextField, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { getApiError, registerUser } from '../api/api';
import { useAuth } from '../Context/auth';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        setError('');
        try {
            await registerUser({ username: username.trim(), password });
            navigate('/login', { replace: true, state: { registered: true } });
        } catch (error) {
            setError(getApiError(error, 'Registration failed. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <CircularProgress aria-label="Checking session" />;
    if (user) return <Navigate to="/recipes" replace />;

    return (
        <Stack component="form" spacing={2} onSubmit={handleRegister} sx={{ maxWidth: 480, mx: 'auto' }}>
            <Typography variant="h4" component="h1">Register</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Username" value={username} required autoComplete="username" helperText="3–50 characters" slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }} onChange={event => setUsername(event.target.value)} />
            <TextField label="Password" value={password} required autoComplete="new-password" type="password" helperText="6–72 characters (up to 72 bytes)" slotProps={{ htmlInput: { minLength: 6, maxLength: 72 } }} onChange={event => setPassword(event.target.value)} />
            <Button variant="contained" type="submit" disabled={submitting}>{submitting ? 'Registering…' : 'Register'}</Button>
        </Stack>
    );
}
