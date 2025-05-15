import { useEffect, useState } from 'react';
import {
    Typography,
    CardActionArea,
    CardMedia,
    CardContent,
    Card,
    Box,
} from '@mui/material';
import { fetchRecipes } from '../api/api';
import type { Recipe } from '../types';

export default function Recipes() {
    const [_recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetchRecipes().then(res => setRecipes(res.data));
    }, []); // fetch on mount

    return (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', padding: 2 }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://sweetandsavorymeals.com/wp-content/uploads/2020/04/breakfast-burrito-680x1020.jpg"
                        alt="Breakfast Burrito"
                    />
                    <CardContent>
                        <Typography variant="h3">
                            Medium
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Beef and Egg Breakfast Taco
                        </Typography>
                        <Typography variant="h6">
                            Breakfast
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Ground beef, rice, eggs, and anything else you want! Brown ground beef in a pan on medium heat.
                            While the beef is browning you can start your rice or other toppings.
                            Once ground beef is browned add in eggs and mix it around until eggs are cooked.
                            Then add in your rice and other toppings and mix. Serve with a tortilla and enjoy!
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Description: 1lb of ground turkey, Paprika, Garlic Powder, Onion Powder, Salt, Pepper.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Cook time: 15 minutes
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://www.allthingsmamma.com/wp-content/uploads/2022/01/Garlic-Butter-Steak-Bites-2.jpg"
                        alt="Steak Bites"
                    />
                    <CardContent>
                        <Typography variant="h3">
                            Easy
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Steak Bites and Broccoli
                        </Typography>
                        <Typography variant="h6">
                            Dinner
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Start with any cubed steak you would like.
                            Add steak to a bowl and drizzle with olive oil.
                            Then season with your seasonings of preference and mix.
                            (We use onion powder, paprika, salt, pepper, garlic powder, and garlic)
                            Once the steak is mixed well and everything is evenly coated put into the air fryer for 8 minutes at
                            400 degrees fahrenheit.
                            When the steak is done cooking take out of the oven and enjoy!
                            For the broccoli, put your florets on a baking sheet and drizzle with olive oil.
                            Then coat the florets in the same seasonings you put on your steak.
                            Put in the oven for 15 minutes at 450 degrees.
                            Take out the broccoli when its done and enjoy!
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Ingredients: 1lb of ground turkey, Paprika, Garlic Powder, Onion Powder, Salt, Pepper.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Cook time: 33 minutes
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://alwaysusebutter.com/wp-content/uploads/2022/10/air-fryer-turkey-burgers-ingredients-1.jpg"
                        alt="Turkey Snack Bars"
                    />
                    <CardContent>
                        <Typography variant="h3">
                            Easy
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            Ground Turkey Snack Bars
                        </Typography>
                        <Typography variant="h6">
                            Lunch
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Start with cutting 1lb of ground turkey into 4 sections.
                            Season the turkey with any seasonings of your choice.
                            Make sure you season both sides!
                            Once seasoned, place all 4 bars into the air fryer and cook for 20 minutes at 360 degrees.
                            Make sure you flip it halfway through.
                            Once the turkey is done cooking, take it out of the air fryer and enjoy!
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Ingredients: 1lb of ground turkey, Paprika, Garlic Powder, Onion Powder, Salt, Pepper.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                            Cook time: 20 minutes
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </Box>
    );
}
