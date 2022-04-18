import {Button, Container, Typography} from "@mui/material";
import SportsTennisSharpIcon from '@mui/icons-material/SportsTennisSharp';

export default function Landing() {
    return (
        <Container>
            <Typography
                variant="h2"
                color="textSecondary"
            >
                Come play in our state of the art Tennis and Padel Courts
            </Typography>
            <Button
                variant="contained"
                href="/signup"
                endIcon={<SportsTennisSharpIcon fontSize="small"/>}
            >
                Sign up | Login
            </Button>

        </Container>
    )
}