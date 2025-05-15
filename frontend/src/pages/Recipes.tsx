import  { useEffect, useState } from 'react';
import { Container, Typography, Stack } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../api/api';
import type { Recipe } from '../types';

export default function Recipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetchRecipes().then(res => setRecipes(res.data));
    }, []); // fetch on mount

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Recipes
            </Typography>

            <Stack spacing={2} mt={4}>
                {recipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </Stack>
        </Container>
    );
}
