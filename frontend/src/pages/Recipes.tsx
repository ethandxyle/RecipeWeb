import { useEffect, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchRecipes, getApiError } from '../api/api';
import RecipeCard from '../components/RecipeCard';
import type { Recipe } from '../types';

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let active = true;
        setLoading(true);
        setError('');
        fetchRecipes()
            .then(response => { if (active) setRecipes(response.data); })
            .catch(error => { if (active) setError(getApiError(error, 'Could not load recipes.')); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [attempt]);

    return (
        <Stack spacing={3}>
            <Typography variant="h4" component="h1">Recipes</Typography>
            {loading ? <Box role="status" aria-label="Loading recipes"><CircularProgress /></Box> : error ? (
                <Alert severity="error" action={<Button color="inherit" onClick={() => setAttempt(value => value + 1)}>Retry</Button>}>
                    {error}
                </Alert>
            ) : recipes.length === 0 ? (
                <Box>
                    <Typography sx={{ mb: 2 }}>No recipes yet. Share your first favorite meal!</Typography>
                    <Button component={Link} to="/submit-recipe" variant="contained">Submit a recipe</Button>
                </Box>
            ) : (
                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                    {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
                </Box>
            )}
        </Stack>
    );
}
