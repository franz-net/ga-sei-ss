import notFound from "../assets/imgs/not-found.svg"
import {Box, Button, Container, Grid, Paper, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function NotFoundError() {
    const theme = useTheme();
    const navigate = useNavigate();
    return (

        <Container component="main" maxWidth="lg">
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: '#fafffa',
                    color: '#fff',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top left',
                    backgroundImage: `url(${notFound})`,
                    width: '100%',
                    height: '100vh',
                    borderRadius: 0
                }}>
                {<img style={{display: 'none'}} src={notFound} alt="404 Not found"/>}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0.0.0,1)'
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: {xs: 3, md: 6},
                                pr: {md: 0}
                            }}
                        >
                            <Typography
                                sx={{
                                    typography: {xs: 'h5', md: 'h3'}
                                }}
                                color="primaryContrastText"
                                gutterBottom
                            >
                                Hey! There is no one playing here!
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate(-1)}
                                size="large"
                            >
                                Go Back
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

        </Container>

    )
}