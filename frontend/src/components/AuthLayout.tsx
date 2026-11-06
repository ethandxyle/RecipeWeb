import type { ReactNode } from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import RestaurantMenuRounded from '@mui/icons-material/RestaurantMenuRounded';
import { Link as RouterLink } from 'react-router-dom';

interface AuthLayoutProps {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
}

export default function AuthLayout({ eyebrow, title, description, children }: AuthLayoutProps) {
    return (
        <Box sx={{ maxWidth: 1060, mx: 'auto', py: { xs: 1, md: 4 } }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: 'background.paper',
            }}>
                <Stack sx={{
                    bgcolor: '#10283F',
                    color: '#fff',
                    p: { xs: 3, sm: 4, md: 5 },
                    minHeight: { md: 580 },
                    justifyContent: 'space-between',
                    gap: { xs: 3, md: 8 },
                    borderTop: '3px solid #BE9857',
                }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <RestaurantMenuRounded sx={{ color: '#D5B77F', fontSize: 24 }} aria-hidden="true" />
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.17em', color: '#E1D2B7' }}>
                            CULINARY CATASTROPHE
                        </Typography>
                    </Stack>
                    <Box>
                        <Box sx={{ width: 36, height: 2, bgcolor: '#BE9857', mb: { xs: 2, md: 3 } }} />
                        <Typography component="h2" sx={{
                            fontFamily: 'Georgia, serif',
                            fontSize: { xs: '1.9rem', md: '3rem' },
                            letterSpacing: '-0.04em',
                            lineHeight: 1.12,
                            maxWidth: 300,
                        }}>
                            Good meals are better shared.
                        </Typography>
                        <Typography sx={{ color: '#C4CED6', lineHeight: 1.8, mt: 2.5, maxWidth: 300, display: { xs: 'none', md: 'block' } }}>
                            A place for everyday favorites, new ideas, and recipes you’ll come back to.
                        </Typography>
                    </Box>
                    <Link component={RouterLink} to="/recipes" underline="none" sx={{
                        display: { xs: 'none', md: 'inline-flex' },
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        gap: 1.25,
                        color: '#E1D2B7',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        '&:hover': { color: '#fff' },
                    }}>
                        Explore the recipes <ArrowForwardRounded sx={{ fontSize: 17 }} />
                    </Link>
                </Stack>
                <Box sx={{ px: { xs: 3, sm: 5, md: 7 }, py: { xs: 4, md: 6 }, alignSelf: 'center' }}>
                    <Typography sx={{ color: 'error.main', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.17em', mb: 1.5 }}>
                        {eyebrow}
                    </Typography>
                    <Typography variant="h3" component="h1" sx={{ fontSize: { xs: '2.1rem', md: '2.65rem' }, mb: 1.5 }}>
                        {title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.7, mb: 4 }}>
                        {description}
                    </Typography>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
