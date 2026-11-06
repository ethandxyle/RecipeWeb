import { Box, CircularProgress, Link, Stack, Typography } from '@mui/material';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { useAuth } from '../Context/auth';

export default function SubmitRecipePage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    if (loading) return <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress aria-label="Checking session" /></Box>;
    if (!user) return <Navigate to="/login" replace state={{ from: '/submit-recipe' }} />;

    return (
        <Box sx={{ maxWidth: 1080, mx: 'auto', py: { xs: 1, md: 3 } }}>
            <Link component={RouterLink} to="/recipes" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontSize: '0.8rem', color: 'text.secondary', mb: 4 }}>
                <ArrowBackRounded sx={{ fontSize: 16 }} /> Back to recipes
            </Link>
            <Box sx={{ maxWidth: 680, mb: { xs: 4, md: 5 } }}>
                <Typography sx={{ color: 'error.main', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.17em', mb: 1.5 }}>FROM YOUR KITCHEN</Typography>
                <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2.35rem', md: '3.2rem' }, mb: 2 }}>Submit a New Recipe</Typography>
                <Typography color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                    That meal you make on repeat? Share it here. A few simple details are all it takes to bring someone else to the table.
                </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 260px' }, gap: { xs: 3, md: 4 }, alignItems: 'start' }}>
                <RecipeForm onAdd={() => navigate('/recipes')} />
                <Box component="aside" aria-label="Recipe writing tips" sx={{ borderTop: '2px solid', borderColor: 'secondary.main', pt: 3, px: { xs: 1, md: 0 } }}>
                    <AutoAwesomeOutlined sx={{ fontSize: 23, color: 'secondary.main', mb: 1.5 }} aria-hidden="true" />
                    <Typography component="h2" sx={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', mb: 2 }}>A recipe worth sharing.</Typography>
                    <Stack spacing={2.5}>
                        {[
                            ['Keep it clear', 'Include ingredient amounts and write the steps in the order you cook them.'],
                            ['Make it yours', 'Share the small tips and favorite variations that make this meal your own.'],
                            ['Bring it to the table', 'Your recipe will appear in the collection as soon as you share it.'],
                        ].map(([title, copy], index) => (
                            <Stack key={title} direction="row" spacing={1.5} alignItems="flex-start">
                                <Typography sx={{ color: 'secondary.main', fontSize: '0.72rem', fontWeight: 700, pt: 0.25 }}>0{index + 1}</Typography>
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 0.5 }}>{title}</Typography>
                                    <Typography color="text.secondary" sx={{ fontSize: '0.82rem', lineHeight: 1.8 }}>{copy}</Typography>
                                </Box>
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
