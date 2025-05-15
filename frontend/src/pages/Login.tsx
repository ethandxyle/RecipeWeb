import { useState } from 'react';
import { loginUser } from '../api/api.ts';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await loginUser({ username, password });
            alert('Logged in!');
        } catch {
            alert('Login failed.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">Login</Typography>
            <TextField label="Username" fullWidth onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" fullWidth type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleLogin} sx={{ mt: 2 }}>Login</Button>
        </Box>
    );
}
