import notFound from "../assets/imgs/not-found.svg"
import {Box, Button, Container, Grid, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function NotFoundError() {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto'
            }}
        >
            <Container>
                <Grid container spacing={3} sx={{height: '100%', mt: 5}}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h5"
                                    color="textSecondary"
                                    gutterBottom
                        >
                            Hey! There is no one playing here!
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            size="large"
                        >
                            Go Back?
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Box>
                            <img src={notFound} alt="404 not found"/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}