import React from 'react';
import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import SignalCellularAltRounded from '@mui/icons-material/SignalCellularAltRounded';
import type { Recipe } from '../types';

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => (
    <Card component="article" variant="outlined" sx={{ overflow: 'hidden', borderTop: recipe.imageUrl ? undefined : '3px solid', borderTopColor: recipe.imageUrl ? undefined : 'secondary.main' }}>
        {recipe.imageUrl && (
            <CardMedia component="img" height="200" image={recipe.imageUrl} alt={recipe.title} />
        )}
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
            <Typography variant="overline" sx={{ color: 'error.main', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', overflowWrap: 'anywhere' }}>
                {recipe.category}
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontSize: '1.8rem', lineHeight: 1.2, mt: 1.2, mb: 2, overflowWrap: 'anywhere' }}>
                {recipe.title}
            </Typography>

            <Stack direction="row" spacing={2.5} flexWrap="wrap" useFlexGap sx={{ mb: 2.5, color: 'text.secondary' }}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                    <AccessTimeRounded sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{recipe.cookingTime} min</Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} alignItems="center">
                    <SignalCellularAltRounded sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{recipe.difficulty}</Typography>
                </Stack>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {recipe.description}
            </Typography>

            <Box component="details" sx={{ mt: 2.5, '&[open] .recipe-expand-icon': { transform: 'rotate(180deg)' } }}>
                <Box component="summary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, cursor: 'pointer', py: 1, listStyle: 'none', '&::-webkit-details-marker': { display: 'none' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'secondary.main', outlineOffset: 4, borderRadius: 1 } }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>Ingredients & instructions</Typography>
                    <ExpandMoreRounded className="recipe-expand-icon" sx={{ fontSize: 20 }} />
                </Box>
                <Stack spacing={2} sx={{ pt: 2 }}>
                    {recipe.ingredients && <Box>
                        <Typography variant="overline" sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em' }}>Ingredients</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                            {recipe.ingredients}
                        </Typography>
                    </Box>}
                    <Box>
                        <Typography variant="overline" sx={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em' }}>Instructions</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.8, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                            {recipe.description}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            {recipe.user && <>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', overflowWrap: 'anywhere' }}>
                    Shared by {recipe.user.username}
                </Typography>
            </>}
        </CardContent>
    </Card>
);

export default RecipeCard;
