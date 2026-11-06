import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useThemeToggle } from '../Context/useThemeToggle';

const DarkModeToggle = () => {
    const theme = useTheme();
    const { toggleTheme } = useThemeToggle();

    return (
        <IconButton onClick={toggleTheme} color="inherit" aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default DarkModeToggle;
