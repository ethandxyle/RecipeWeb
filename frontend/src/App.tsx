import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import HomePage from './pages/Home';
import RecipesPage from './pages/Recipes';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import NavBar from './components/NavBar';
import SubmitRecipePage from './pages/SubmitRecipe';

export default function App() {
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <Router>
                <NavBar />
                <Container component="main" sx={{ py: 4 }}>
                    <Paper sx={{ p: { xs: 2, sm: 4 } }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/recipes" element={<RecipesPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/submit-recipe" element={<SubmitRecipePage />} />
                            <Route path="*" element={<>
                                <Typography variant="h4" gutterBottom>Page not found</Typography>
                                <Button component={Link} to="/">Go home</Button>
                            </>} />
                        </Routes>
                    </Paper>
                </Container>
            </Router>
        </Box>
    );
}
