import { useEffect, useState } from 'react';
import { Alert, Box, Button, Paper, Skeleton, Stack, Typography } from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import RestaurantMenuOutlined from '@mui/icons-material/RestaurantMenuOutlined';
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
        <Stack spacing={{ xs: 4, md: 5 }} sx={{ py: { xs: 2, md: 4 } }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                <Box sx={{ maxWidth: 640 }}>
                    <Typography variant="overline" sx={{ color: 'error.main', letterSpacing: '0.18em', fontWeight: 700 }}>
                        From the community
                    </Typography>
                    <Typography variant="h1" sx={{ mt: 1, mb: 2, fontSize: { xs: '2.7rem', md: '4rem' } }}>
                        Recipes worth sharing.
                    </Typography>
                    <Typography color="text.secondary" sx={{ maxWidth: 520, lineHeight: 1.8 }}>
                        Everyday meals, personal favorites, and a little kitchen inspiration.
                        Find something good to cook, or share a recipe of your own.
                    </Typography>
                </Box>
                <Button component={Link} to="/submit-recipe" variant="contained" startIcon={<AddRounded />} sx={{ flexShrink: 0 }}>
                    Share a recipe
                </Button>
            </Stack>

            <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderTop: 1, borderColor: 'divider', pt: 2.5, mb: 3 }}>
                    <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: '0.14em' }}>The collection</Typography>
                    {!loading && !error && <Typography variant="body2" color="text.secondary">
                        {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'}
                    </Typography>}
                </Stack>

                {loading ? (
                    <Box role="status" aria-label="Loading recipes">
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Gathering the recipes…</Typography>
                        <Box aria-hidden="true" sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                            {[1, 2, 3].map(item => <Paper key={item} variant="outlined" sx={{ p: 3, minHeight: 280 }}>
                                <Skeleton width="32%" height={20} />
                                <Skeleton width="85%" height={52} sx={{ mb: 2 }} />
                                <Skeleton width="100%" />
                                <Skeleton width="100%" />
                                <Skeleton width="70%" />
                            </Paper>)}
                        </Box>
                    </Box>
                ) : error ? (
                    <Alert severity="error" action={<Button color="inherit" onClick={() => setAttempt(value => value + 1)}>Retry</Button>}>
                        {error}
                    </Alert>
                ) : recipes.length === 0 ? (
                    <Paper variant="outlined" sx={{ p: { xs: 3, sm: 6 }, textAlign: 'center', borderTop: '3px solid', borderTopColor: 'secondary.main' }}>
                        <Box sx={{ width: 68, height: 68, mx: 'auto', mb: 3, display: 'grid', placeItems: 'center', border: 1, borderColor: 'divider', borderRadius: '50%', color: 'secondary.main' }}>
                            <RestaurantMenuOutlined sx={{ fontSize: 28 }} />
                        </Box>
                        <Typography variant="h3" component="h2" sx={{ mb: 1.5, fontSize: { xs: '1.8rem', sm: '2.3rem' } }}>
                            A good meal starts somewhere.
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>No recipes yet. Share your first favorite meal!</Typography>
                        <Button component={Link} to="/submit-recipe" variant="contained" endIcon={<ArrowForwardRounded />}>
                            Submit a recipe
                        </Button>
                    </Paper>
                ) : (
                    <Box sx={{ display: 'grid', gap: 3, alignItems: 'start', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
                        {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
                    </Box>
                )}
            </Box>
        </Stack>
    );
}
