import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Culinary Catastrophe
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/recipes">
                    Recipes
                </Button>
                <Button color="inherit" component={Link} to="/submit-recipe">
                    Submit Recipe
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                    Register
                </Button>
                <DarkModeToggle />
            </Toolbar>
        </AppBar>
    );
}
