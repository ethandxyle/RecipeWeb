import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Alert } from '@mui/material';
import RestaurantMenu from '@mui/icons-material/RestaurantMenu';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../Context/auth';
import { getApiError } from '../api/api';

export default function NavBar() {
    const { user, loading, logout } = useAuth();
    const [error, setError] = useState('');
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        setLoggingOut(true);
        setError('');
        try {
            await logout();
        } catch (error) {
            setError(getApiError(error, 'Could not log out. Please try again.'));
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ gap: 1, flexWrap: 'wrap', py: 1 }}>
                    <RestaurantMenu aria-hidden="true" />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Culinary Catastrophe</Typography>
                    <Box component="nav" aria-label="Main navigation" sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
                        <Button color="inherit" component={Link} to="/submit-recipe">Submit Recipe</Button>
                        {!loading && (user ? <>
                            <Typography component="span" sx={{ mx: 1, overflowWrap: 'anywhere' }}>Hi, {user.username}</Typography>
                            <Button color="inherit" onClick={handleLogout} disabled={loggingOut}>{loggingOut ? 'Logging out…' : 'Logout'}</Button>
                        </> : <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>)}
                        <DarkModeToggle />
                    </Box>
                </Toolbar>
            </AppBar>
            {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
        </>
    );
}
