import { Box, Button, Stack, Typography } from '@mui/material';
import RestaurantMenu from '@mui/icons-material/RestaurantMenu';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Box textAlign="center" sx={{ py: 4 }}>
            <RestaurantMenu color="primary" sx={{ fontSize: 96, mb: 2 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '4rem' } }}>
                Culinary Catastrophe
            </Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>Stress Free Kitchen</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
                Browse or add your favorite meals with ease!
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                <Button component={Link} to="/recipes" variant="contained">Browse recipes</Button>
                <Button component={Link} to="/submit-recipe" variant="outlined">Submit recipe</Button>
            </Stack>
        </Box>
    );
}
