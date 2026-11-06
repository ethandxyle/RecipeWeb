import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Alert, TextField, Button, Stack, MenuItem } from '@mui/material';
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
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required slotProps={{ htmlInput: { maxLength: 200 } }} />
            <TextField label="Description and instructions" name="description" value={formData.description} onChange={handleChange} required multiline minRows={3} slotProps={{ htmlInput: { maxLength: 10000 } }} />
            <TextField label="Ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required multiline minRows={3} slotProps={{ htmlInput: { maxLength: 10000 } }} />
            <TextField select label="Category" name="category" value={formData.category} onChange={handleChange} required>
                {['Breakfast', 'Lunch', 'Dinner', 'Dessert'].map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
            </TextField>
            <TextField label="Cooking Time (minutes)" name="cookingTime" type="number" value={formData.cookingTime} onChange={handleChange} required slotProps={{ htmlInput: { min: 1, step: 1, max: 2147483647 } }} />
            <TextField select label="Difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                {['Easy', 'Medium', 'Hard'].map(difficulty => <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>)}
            </TextField>
            <Button variant="contained" type="submit" disabled={submitting}>
                {submitting ? 'Adding recipe…' : 'Add Recipe'}
            </Button>
        </Stack>
    );
}
