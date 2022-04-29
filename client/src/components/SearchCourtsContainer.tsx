import {Box, Paper, Typography} from "@mui/material";

export default function SearchCourtsContainer() {

    return (
        <Paper
            sx={{}}
            elevation={8}
        >
            <Box
                sx={{
                    margin: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                <Typography fontWeight={600} gutterBottom sx={{mt: 4, mb: 4, typography: {xs: 'h5', md: 'h4'}}}>
                    Courts
                </Typography>
            </Box>
        </Paper>
    )
}