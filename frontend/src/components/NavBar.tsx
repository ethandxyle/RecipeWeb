import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

export default function NavBar() {
    return (
        <AppBar position="static"
        >
            <Toolbar>
                <Box
                    component="img"
                    sx={{
                        height: 64,
                    }}
                    alt="Your logo."
                    src={'https://sdmntprwestus2.oaiusercontent.com/files/00000000-1b20-61f8-938f-8f236e257174/raw?se=2025-05-15T15%3A36%3A59Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=7399a3a4-0259-4d43-bcd6-a56ceeb4c28b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-14T22%3A17%3A23Z&ske=2025-05-15T22%3A17%3A23Z&sks=b&skv=2024-08-04&sig=v2qHTnM6Y7KMpzWrQLwArvBvR6zrNqZcVrJkPL0KE5Q%3D'}
                />
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
