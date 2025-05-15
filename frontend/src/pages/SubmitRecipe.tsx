
import { Container, Typography } from '@mui/material';
import RecipeForm from '../components/RecipeForm';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../types';

export default function SubmitRecipePage() {
    const navigate = useNavigate();

    // After adding recipe, navigate back to recipes page
    const handleAdd = (_recipe: Recipe) => {
        // Optionally show a toast or success message here before navigating
        navigate('/recipes');
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Submit a New Recipe
            </Typography>
            <RecipeForm onAdd={handleAdd} />
        </Container>
    );
}
