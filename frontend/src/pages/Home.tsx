import {Box, Typography} from '@mui/material';

export default function Home() {
    return (
        <div className={"home"}>
            <Box textAlign="center" mt={5} >
                <Typography variant="h1">🍽️ Culinary Catastrophe</Typography>
                <Typography variant="h4">Stress Free Kitchen</Typography>
                <Typography variant="h5" mt={2}>
                    Browse or add your favorite meals with ease!
                </Typography>
                <img src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-1b20-61f8-938f-8f236e257174/raw?se=2025-05-15T15%3A36%3A59Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=7399a3a4-0259-4d43-bcd6-a56ceeb4c28b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-14T22%3A17%3A23Z&ske=2025-05-15T22%3A17%3A23Z&sks=b&skv=2024-08-04&sig=v2qHTnM6Y7KMpzWrQLwArvBvR6zrNqZcVrJkPL0KE5Q%3D"
                     alt="Logo" height="300px" width="400px" />
            </Box>
        </div>

    )
}