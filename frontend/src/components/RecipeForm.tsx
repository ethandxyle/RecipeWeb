import React, { useState } from 'react';
import { TextField, Button, Stack, MenuItem } from '@mui/material';
import { addRecipe } from '../api/api';
import type { Recipe } from '../types';

interface RecipeFormProps {
    onAdd: (recipe: Recipe) => void;
}

export default function RecipeForm({ onAdd }: RecipeFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        cookingTime: '',
        difficulty: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await addRecipe({
                ...formData,
                cookingTime: Number(formData.cookingTime),
            });
            onAdd(response.data); // add new recipe to parent list
            // Reset form
            setFormData({
                title: '',
                description: '',
                category: '',
                cookingTime: '',
                difficulty: '',
            });
        } catch (err) {
            alert('Failed to add recipe.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    sx={{
                        backgroundColor: formData.title ? 'lightblue' : 'transparent' }}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    sx={{
                        backgroundColor: formData.description ? 'lightblue' : 'transparent' }}
                />
                <TextField
                    select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    sx={{
                        backgroundColor: formData.category ? 'lightblue' : 'transparent' }}
                >
                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                    <MenuItem value="Dessert">Dessert</MenuItem>

                </TextField>
                <TextField
                    label="Cooking Time (minutes)"
                    name="cookingTime"
                    type="number"
                    value={formData.cookingTime}
                    onChange={handleChange}
                    required
                    sx={{
                        backgroundColor: formData.cookingTime ? 'lightblue' : 'transparent' }}
                />
                <TextField
                    select
                    label="Difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    sx={{
                    backgroundColor: formData.cookingTime ? 'lightblue' : 'transparent' }}
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
                {/*<TextField*/}
                {/*    label="Image Link"*/}
                {/*    name="image link"*/}
                {/*    onChange={handleChange}*/}
                {/*    required*/}
                {/*    fullWidth*/}

                {/*/>*/}
                {/*<TextField*/}
                {/*    label="Exact Ingredients:"*/}
                {/*    name="description"*/}
                {/*    onChange={handleChange}*/}
                {/*    required*/}
                {/*    fullWidth*/}

                {/*/>*/}

                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    Add Recipe
                </Button>
            </Stack>
        </form>
    );
}
