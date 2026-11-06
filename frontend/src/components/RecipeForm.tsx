import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Alert, Box, TextField, Button, Stack, MenuItem, Typography, Divider } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import { Link } from 'react-router-dom';
import { addRecipe, getApiError } from '../api/api';
import type { Recipe } from '../types';

interface RecipeFormProps {
    onAdd: (recipe: Recipe) => void;
}

export default function RecipeForm({ onAdd }: RecipeFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        category: '',
        cookingTime: '',
        difficulty: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(previous => ({ ...previous, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submitting) return;
        if (!formData.title.trim() || !formData.description.trim() || !formData.ingredients.trim()) {
            setError('Please enter a title, description, and ingredients.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const response = await addRecipe({
                ...formData,
                title: formData.title.trim(),
                description: formData.description.trim(),
                ingredients: formData.ingredients.trim(),
                cookingTime: Number(formData.cookingTime),
            });
            onAdd(response.data);
        } catch (error) {
            setError(getApiError(error, 'Failed to add recipe. Please try again.'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Stack component="form" onSubmit={handleSubmit} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '16px', bgcolor: 'background.paper', minWidth: 0 }}>
            <Stack spacing={3} sx={{ p: { xs: 2.5, sm: 4 } }}>
                {error && <Alert severity="error">{error}</Alert>}
                <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', mb: 1 }}>01 / THE BASICS</Typography>
                    <Typography component="h2" sx={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', mb: 1 }}>Start with the essentials.</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.82rem' }}>Give your recipe a name and a few helpful details.</Typography>
                </Box>
                <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required fullWidth placeholder="A name that makes you hungry" slotProps={{ htmlInput: { maxLength: 200 } }} />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
                    <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} required fullWidth>
                        {['Breakfast', 'Lunch', 'Dinner', 'Dessert'].map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                    </TextField>
                    <TextField select label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} required fullWidth>
                        {['Easy', 'Medium', 'Hard'].map(difficulty => <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>)}
                    </TextField>
                </Box>
                <TextField label="Cooking Time (minutes)" name="cookingTime" type="number" value={formData.cookingTime} onChange={handleChange} required fullWidth helperText="The total time from preparation to plate." slotProps={{ htmlInput: { min: 1, step: 1, max: 2147483647 } }} />
            </Stack>
            <Divider />
            <Stack spacing={3} sx={{ p: { xs: 2.5, sm: 4 } }}>
                <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', mb: 1 }}>02 / THE GOOD PART</Typography>
                    <Typography component="h2" sx={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', mb: 1 }}>Make it easy to follow.</Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.82rem' }}>Simple ingredients. Clear instructions. Good food.</Typography>
                </Box>
                <TextField label="Ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required fullWidth multiline minRows={4} helperText="List each ingredient with its amount on a separate line." slotProps={{ htmlInput: { maxLength: 10000 } }} />
                <TextField label="Description and instructions" name="description" value={formData.description} onChange={handleChange} required fullWidth multiline minRows={5} helperText="Introduce the dish, then walk us through the steps." slotProps={{ htmlInput: { maxLength: 10000 } }} />
            </Stack>
            <Divider />
            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }} justifyContent="space-between" sx={{ px: { xs: 2.5, sm: 4 }, py: 3 }}>
                <Button component={Link} to="/recipes" color="inherit" sx={{ color: 'text.secondary' }}>Cancel</Button>
                <Button variant="contained" type="submit" size="large" disabled={submitting} endIcon={<ArrowForwardRounded sx={{ fontSize: 18 }} />}>
                    {submitting ? 'Adding recipe…' : 'Add Recipe'}
                </Button>
            </Stack>
        </Stack>
    );
}
