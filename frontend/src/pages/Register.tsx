import { useState } from 'react';
import { registerUser } from '../api/api.ts';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser({ username, password });
            alert('Registered!');
        } catch {
            alert('Registration failed.');
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5">Register</Typography>
            <TextField label="Username" fullWidth onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Password" fullWidth type="password" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleRegister} sx={{ mt: 2 }}>Register</Button>
        </Box>
    );
}
