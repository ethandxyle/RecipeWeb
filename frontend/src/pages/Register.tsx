import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Alert, TextField, Button, Typography, Stack, CircularProgress, Link, Box } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { getApiError, registerUser } from '../api/api';
import { useAuth } from '../Context/auth';
import AuthLayout from '../components/AuthLayout';

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

    if (loading) return <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress aria-label="Checking session" /></Box>;
    if (user) return <Navigate to="/recipes" replace />;

    return (
        <AuthLayout eyebrow="PULL UP A CHAIR" title="Join the table." description="Create your account and add your own everyday favorites to the collection.">
            <Stack component="form" spacing={2.5} onSubmit={handleRegister}>
                {error && <Alert severity="error">{error}</Alert>}
                <TextField label="Username" value={username} required autoComplete="username" fullWidth helperText="3–50 characters" slotProps={{ htmlInput: { minLength: 3, maxLength: 50 } }} onChange={event => setUsername(event.target.value)} />
                <TextField label="Password" value={password} required autoComplete="new-password" type="password" fullWidth helperText="6–72 characters (up to 72 bytes)" slotProps={{ htmlInput: { minLength: 6, maxLength: 72 } }} onChange={event => setPassword(event.target.value)} />
                <Button variant="contained" type="submit" size="large" disabled={submitting} endIcon={<ArrowForwardRounded sx={{ fontSize: 18 }} />}>
                    {submitting ? 'Registering…' : 'Register'}
                </Button>
            </Stack>
            <Typography sx={{ mt: 3.5, fontSize: '0.875rem', color: 'text.secondary', textAlign: 'center' }}>
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" underline="hover" sx={{ fontWeight: 700 }}>Log in</Link>
            </Typography>
        </AuthLayout>
    );
}
