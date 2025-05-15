import {Box, Typography} from '@mui/material';

export default function Home() {
    return (
        <div className={"home"}>
            <Box textAlign="center" mt={5} >
                <Typography variant="h1">🍽️ Culinary Catastrophe</Typography>
                <Typography variant="h5" mt={2}>
                    Browse or add your favorite meals!
                </Typography>
                <img src="https://sdmntprwestus2.oaiusercontent.com/files/00000000-1b20-61f8-938f-8f236e257174/raw?se=2025-05-07T17%3A07%3A28Z&sp=r&sv=2024-08-04&sr=b&scid=47440b86-891e-5da2-9471-f8531c840cda&skoid=e4438ed3-2a6f-4fd3-bf63-222012dc627c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-07T12%3A38%3A40Z&ske=2025-05-08T12%3A38%3A40Z&sks=b&skv=2024-08-04&sig=oQqtAmABxJ4R8B%2BN4%2B452jW2KfRSnPl6gTmEi13ZULM%3D"
                     alt="Logo" height="300px" width="400px" />
            </Box>
        </div>

    )
}