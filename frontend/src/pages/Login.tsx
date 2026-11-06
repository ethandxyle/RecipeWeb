import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert, TextField, Button, Typography, Stack, CircularProgress, Link, Box } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { getApiError } from '../api/api';
import { useAuth } from '../Context/auth';
import AuthLayout from '../components/AuthLayout';

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

    if (loading) return <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress aria-label="Checking session" /></Box>;
    if (user) return <Navigate to={destination} replace />;

    return (
        <AuthLayout eyebrow="BACK TO YOUR KITCHEN" title="Welcome back." description="Log in to share what’s cooking and find your next favorite meal.">
            <Stack component="form" spacing={2.5} onSubmit={handleLogin}>
                {location.state?.registered && <Alert severity="success">Account created. You can now log in.</Alert>}
                {location.state?.from === '/submit-recipe' && <Alert severity="info">Log in to share a recipe.</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                <TextField label="Username" value={username} required autoComplete="username" fullWidth onChange={event => setUsername(event.target.value)} />
                <TextField label="Password" value={password} required autoComplete="current-password" type="password" fullWidth onChange={event => setPassword(event.target.value)} />
                <Button variant="contained" type="submit" size="large" disabled={submitting} endIcon={<ArrowForwardRounded sx={{ fontSize: 18 }} />}>
                    {submitting ? 'Logging in…' : 'Login'}
                </Button>
            </Stack>
            <Typography sx={{ mt: 3.5, fontSize: '0.875rem', color: 'text.secondary', textAlign: 'center' }}>
                New to the table?{' '}
                <Link component={RouterLink} to="/register" underline="hover" sx={{ fontWeight: 700 }}>Create an account</Link>
            </Typography>
        </AuthLayout>
    );
}
