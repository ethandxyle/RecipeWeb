import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import type { Recipe } from '../types';

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
    <Card>
        {recipe.imageUrl && (
            <CardMedia component="img" height="140" image={recipe.imageUrl} alt={recipe.title} />
        )}
        <CardContent>
            <Typography variant="h5" gutterBottom>
                {recipe.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                {recipe.description}
            </Typography>
            {recipe.ingredients && <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                Ingredients: {recipe.ingredients}
            </Typography>}
            <Typography variant="body2" color="text.secondary">
                Category: {recipe.category} | Difficulty: {recipe.difficulty} | Cooking Time: {recipe.cookingTime} mins
            </Typography>
            {recipe.user && <Typography variant="caption" color="text.secondary">Shared by {recipe.user.username}</Typography>}
        </CardContent>
    </Card>
);

export default RecipeCard;
