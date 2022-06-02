import {Container, Grid, Paper, Typography} from "@mui/material";

export default function Dashboard() {
    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
            >
                <Paper>
                    <Typography
                        variant="h5"
                        sx={{m: 4}}
                    >
                        Upcoming Reservations
                    </Typography>
                </Paper>

                <Paper>
                    <Typography
                        variant="h5"
                        sx={{m: 4}}
                    >
                        News
                    </Typography>
                </Paper>

            </Grid>
        </Container>
    )
}