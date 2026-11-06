import { CircularProgress, Stack, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { useAuth } from '../Context/auth';

export default function SubmitRecipePage() {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    if (loading) return <CircularProgress aria-label="Checking session" />;
    if (!user) return <Navigate to="/login" replace state={{ from: '/submit-recipe' }} />;

    return (
        <Stack spacing={3}>
            <Typography variant="h4" component="h1">Submit a New Recipe</Typography>
            <RecipeForm onAdd={() => navigate('/recipes')} />
        </Stack>
    );
}
